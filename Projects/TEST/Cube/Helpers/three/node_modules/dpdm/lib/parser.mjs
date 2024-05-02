/*!
 * Copyright 2019 acrazing <joking.young@gmail.com>. All rights reserved.
 * @since 2019-07-17 18:45:32
 */
import { __awaiter } from "tslib";
import fs from 'fs-extra';
import * as G from 'glob';
import path from 'path';
import ts from 'typescript';
import { DependencyKind } from './consts';
import { normalizeOptions, shortenTree, simpleResolver, } from './utils';
const typescriptTransformOptions = {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    jsx: ts.JsxEmit.Preserve,
    isolatedModules: true,
};
function parseTreeRecursive(context, request, options, output, resolve) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = yield resolve(context, request, options.extensions);
        if (!id || output[id]) {
            return id;
        }
        if (!options.include.test(id) || options.exclude.test(id)) {
            output[id] = null;
            return id;
        }
        if (options.js.indexOf(path.extname(id)) === -1) {
            output[id] = [];
            return id;
        }
        options.onProgress('start', id);
        const dependencies = (output[id] = []);
        const jobs = [];
        const newContext = path.dirname(id);
        function nodeVisitor(node) {
            let newRequest;
            let kind;
            if (ts.isImportDeclaration(node)) {
                newRequest = node.moduleSpecifier.text;
                kind = DependencyKind.StaticImport;
            }
            else if (ts.isCallExpression(node) &&
                node.expression.kind === ts.SyntaxKind.ImportKeyword &&
                node.arguments.length === 1 &&
                ts.isStringLiteral(node.arguments[0]) &&
                !options.skipDynamicImports) {
                newRequest = node.arguments[0].text;
                kind = DependencyKind.DynamicImport;
            }
            else if (ts.isCallExpression(node) &&
                ts.isIdentifier(node.expression) &&
                node.expression.escapedText === 'require' &&
                node.arguments.length === 1 &&
                ts.isStringLiteral(node.arguments[0])) {
                newRequest = node.arguments[0].text;
                kind = DependencyKind.CommonJS;
            }
            else if (ts.isExportDeclaration(node) &&
                node.moduleSpecifier &&
                ts.isStringLiteral(node.moduleSpecifier)) {
                newRequest = node.moduleSpecifier.text;
                kind = DependencyKind.StaticExport;
            }
            else {
                ts.forEachChild(node, nodeVisitor);
                return;
            }
            dependencies.push({
                issuer: id,
                request: newRequest,
                kind: kind,
                id: null,
            });
            jobs.push(parseTreeRecursive(newContext, newRequest, options, output, resolve));
        }
        const code = yield fs.readFile(id, 'utf8');
        const ext = path.extname(id);
        let source;
        if (options.transform &&
            (ext === ts.Extension.Ts || ext === ts.Extension.Tsx)) {
            ts.transpileModule(code, {
                compilerOptions: typescriptTransformOptions,
                transformers: {
                    after: [() => (node) => (source = node)],
                },
            });
        }
        else {
            source = ts.createSourceFile(id, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
        }
        ts.forEachChild(source, nodeVisitor);
        options.onProgress('end', id);
        return Promise.all(jobs).then((deps) => {
            deps.forEach((id, index) => (dependencies[index].id = id));
            return id;
        });
    });
}
/**
 * @param entries - the entry glob list
 * @param options
 */
export function parseDependencyTree(entries, options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!Array.isArray(entries)) {
            entries = [entries];
        }
        const currentDirectory = process.cwd();
        const output = {};
        const fullOptions = normalizeOptions(options);
        let resolve = simpleResolver;
        if (options.tsconfig) {
            const compilerOptions = ts.parseJsonConfigFileContent(ts.readConfigFile(options.tsconfig, ts.sys.readFile).config, ts.sys, path.dirname(options.tsconfig)).options;
            const host = ts.createCompilerHost(compilerOptions);
            resolve = (context, request, extensions) => __awaiter(this, void 0, void 0, function* () {
                const module = ts.resolveModuleName(request, path.join(context, 'index.ts'), compilerOptions, host).resolvedModule;
                if (module && module.extension !== ts.Extension.Dts) {
                    return module.resolvedFileName;
                }
                else {
                    const filename = yield simpleResolver(context, request, extensions);
                    if (filename === null && module) {
                        return simpleResolver(context, module.resolvedFileName.slice(0, -ts.Extension.Dts.length), extensions);
                    }
                    return filename;
                }
            });
        }
        yield Promise.all(entries.map((entry) => G.glob(entry).then((matches) => Promise.all(matches.map((filename) => parseTreeRecursive(currentDirectory, path.join(currentDirectory, filename), fullOptions, output, resolve))))));
        if (fullOptions.context) {
            return shortenTree(fullOptions.context, output);
        }
        return output;
    });
}
//# sourceMappingURL=parser.js.map