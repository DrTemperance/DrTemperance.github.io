/*!
 * Copyright 2019 acrazing <joking.young@gmail.com>. All rights reserved.
 * @since 2019-07-17 18:45:32
 */
import { __awaiter } from "tslib";
import chalk from 'chalk';
import fs from 'fs-extra';
import { builtinModules } from 'module';
import path from 'path';
import { DependencyKind } from './consts';
const allBuiltins = new Set(builtinModules);
export const defaultOptions = {
    context: process.cwd(),
    extensions: ['', '.ts', '.tsx', '.mjs', '.js', '.jsx', '.json'],
    js: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
    include: /.*/,
    exclude: /node_modules/,
    tsconfig: void 0,
    transform: false,
    skipDynamicImports: false,
    onProgress: () => void 0,
};
export function normalizeOptions(options) {
    const newOptions = Object.assign(Object.assign({}, defaultOptions), options);
    if (newOptions.extensions.indexOf('') < 0) {
        newOptions.extensions.unshift('');
    }
    newOptions.context = path.resolve(newOptions.context);
    if (options.tsconfig === void 0) {
        try {
            const tsconfig = path.join(newOptions.context, 'tsconfig.json');
            const stat = fs.statSync(tsconfig);
            if (stat.isFile()) {
                options.tsconfig = tsconfig;
            }
        }
        catch (_a) { }
    }
    else {
        let stat;
        try {
            stat = fs.statSync(options.tsconfig);
        }
        catch (_b) { }
        if (!stat || !stat.isFile()) {
            throw new Error(`specified tsconfig "${options.tsconfig}" is not a file`);
        }
        options.tsconfig = path.join(process.cwd(), options.tsconfig);
    }
    return newOptions;
}
export function appendSuffix(request, extensions) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const ext of extensions) {
            try {
                const stat = yield fs.stat(request + ext);
                if (stat.isFile()) {
                    return request + ext;
                }
            }
            catch (_a) { }
        }
        try {
            const stat = yield fs.stat(request);
            if (stat.isDirectory()) {
                return appendSuffix(path.join(request, 'index'), extensions);
            }
        }
        catch (_b) { }
        return null;
    });
}
export const simpleResolver = (context, request, extensions) => __awaiter(void 0, void 0, void 0, function* () {
    if (path.isAbsolute(request)) {
        return appendSuffix(request, extensions);
    }
    if (request.charAt(0) === '.') {
        return appendSuffix(path.join(context, request), extensions);
    }
    // is package
    const nodePath = { paths: [context] };
    try {
        const pkgPath = require.resolve(path.join(request, 'package.json'), nodePath);
        const pkgJson = yield fs.readJSON(pkgPath);
        const id = path.join(path.dirname(pkgPath), pkgJson.module || pkgJson.main);
        return appendSuffix(id, extensions);
    }
    catch (_a) { }
    try {
        return require.resolve(request, nodePath);
    }
    catch (_b) { }
    return null;
});
export function shortenTree(context, tree) {
    const output = {};
    for (const key in tree) {
        const shortKey = path.relative(context, key);
        output[shortKey] = tree[key]
            ? tree[key].map((item) => (Object.assign(Object.assign({}, item), { issuer: shortKey, id: item.id === null ? null : path.relative(context, item.id) })))
            : null;
    }
    return output;
}
export function parseCircular(tree, skipDynamicImports = false) {
    const circulars = [];
    tree = Object.assign({}, tree);
    function visit(id, used) {
        const index = used.indexOf(id);
        if (index > -1) {
            circulars.push(used.slice(index));
        }
        else if (tree[id]) {
            used.push(id);
            const deps = tree[id];
            delete tree[id];
            deps &&
                deps.forEach((dep) => {
                    if (dep.id &&
                        (!skipDynamicImports || dep.kind !== DependencyKind.DynamicImport)) {
                        visit(dep.id, used.slice());
                    }
                });
        }
    }
    for (const id in tree) {
        visit(id, []);
    }
    return circulars;
}
export function parseDependents(tree) {
    const output = {};
    for (const key in tree) {
        const deps = tree[key];
        if (deps) {
            deps.forEach((dep) => {
                if (dep.id) {
                    (output[dep.id] = output[dep.id] || []).push(key);
                }
            });
        }
    }
    for (const key in output) {
        output[key].sort();
    }
    return output;
}
export function parseWarnings(tree, dependents = parseDependents(tree)) {
    const warnings = [];
    const builtin = new Set();
    for (const key in tree) {
        const deps = tree[key];
        if (!builtin.has(key) && allBuiltins.has(key)) {
            builtin.add(key);
        }
        if (!deps) {
            const parents = dependents[key] || [];
            const total = parents.length;
            warnings.push(`skip ${JSON.stringify(key)}, issuers: ${parents
                .slice(0, 2)
                .map((id) => JSON.stringify(id))
                .join(', ')}${total > 2 ? ` (${total - 2} more...)` : ''}`);
        }
        else {
            for (const dep of deps) {
                if (!dep.id) {
                    warnings.push(`miss ${JSON.stringify(dep.request)} in ${JSON.stringify(dep.issuer)}`);
                }
            }
        }
    }
    if (builtin.size > 0) {
        warnings.push('node ' + Array.from(builtin, (item) => JSON.stringify(item)).join(', '));
    }
    return warnings.sort();
}
export function prettyTree(tree, entries, prefix = '  ') {
    const lines = [];
    let id = 0;
    const idMap = {};
    const digits = Math.ceil(Math.log10(Object.keys(tree).length));
    function visit(item, prefix, hasMore) {
        const isNew = idMap[item] === void 0;
        const iid = (idMap[item] = idMap[item] || id++);
        let line = chalk.gray(prefix + '- ' + iid.toString().padStart(digits, '0') + ') ');
        const deps = tree[item];
        if (allBuiltins.has(item)) {
            lines.push(line + chalk.blue(item));
            return;
        }
        else if (!isNew) {
            lines.push(line + chalk.gray(item));
            return;
        }
        else if (!deps) {
            lines.push(line + chalk.yellow(item));
            return;
        }
        lines.push(line + item);
        prefix += hasMore ? '·   ' : '    ';
        for (let i = 0; i < deps.length; i++) {
            visit(deps[i].id || deps[i].request, prefix, i < deps.length - 1);
        }
    }
    for (let i = 0; i < entries.length; i++) {
        visit(entries[i], prefix, i < entries.length - 1);
    }
    return lines.join('\n');
}
export function prettyCircular(circulars, prefix = '  ') {
    const digits = Math.ceil(Math.log10(circulars.length));
    return circulars
        .map((line, index) => {
        return (chalk.gray(`${prefix}${(index + 1).toString().padStart(digits, '0')}) `) + line.map((item) => chalk.red(item)).join(chalk.gray(' -> ')));
    })
        .join('\n');
}
export function prettyWarning(warnings, prefix = '  ') {
    const digits = Math.ceil(Math.log10(warnings.length));
    return warnings
        .map((line, index) => {
        return (chalk.gray(`${prefix}${(index + 1).toString().padStart(digits, '0')}) `) + chalk.yellow(line));
    })
        .join('\n');
}
export function isEmpty(v) {
    if (v == null) {
        return true;
    }
    for (const k in v) {
        if (v.hasOwnProperty(k)) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=utils.js.map