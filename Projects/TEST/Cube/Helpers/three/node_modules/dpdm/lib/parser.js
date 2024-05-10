"use strict";
/*!
 * Copyright 2019 acrazing <joking.young@gmail.com>. All rights reserved.
 * @since 2019-07-17 18:45:32
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDependencyTree = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const G = tslib_1.__importStar(require("glob"));
const path_1 = tslib_1.__importDefault(require("path"));
const typescript_1 = tslib_1.__importDefault(require("typescript"));
const consts_1 = require("./consts");
const utils_1 = require("./utils");
const typescriptTransformOptions = {
    target: typescript_1.default.ScriptTarget.ESNext,
    module: typescript_1.default.ModuleKind.ESNext,
    jsx: typescript_1.default.JsxEmit.Preserve,
    isolatedModules: true,
};
function parseTreeRecursive(context, request, options, output, resolve) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const id = yield resolve(context, request, options.extensions);
        if (!id || output[id]) {
            return id;
        }
        if (!options.include.test(id) || options.exclude.test(id)) {
            output[id] = null;
            return id;
        }
        if (options.js.indexOf(path_1.default.extname(id)) === -1) {
            output[id] = [];
            return id;
        }
        options.onProgress('start', id);
        const dependencies = (output[id] = []);
        const jobs = [];
        const newContext = path_1.default.dirname(id);
        function nodeVisitor(node) {
            let newRequest;
            let kind;
            if (typescript_1.default.isImportDeclaration(node)) {
                newRequest = node.moduleSpecifier.text;
                kind = consts_1.DependencyKind.StaticImport;
            }
            else if (typescript_1.default.isCallExpression(node) &&
                node.expression.kind === typescript_1.default.SyntaxKind.ImportKeyword &&
                node.arguments.length === 1 &&
                typescript_1.default.isStringLiteral(node.arguments[0]) &&
                !options.skipDynamicImports) {
                newRequest = node.arguments[0].text;
                kind = consts_1.DependencyKind.DynamicImport;
            }
            else if (typescript_1.default.isCallExpression(node) &&
                typescript_1.default.isIdentifier(node.expression) &&
                node.expression.escapedText === 'require' &&
                node.arguments.length === 1 &&
                typescript_1.default.isStringLiteral(node.arguments[0])) {
                newRequest = node.arguments[0].text;
                kind = consts_1.DependencyKind.CommonJS;
            }
            else if (typescript_1.default.isExportDeclaration(node) &&
                node.moduleSpecifier &&
                typescript_1.default.isStringLiteral(node.moduleSpecifier)) {
                newRequest = node.moduleSpecifier.text;
                kind = consts_1.DependencyKind.StaticExport;
            }
            else {
                typescript_1.default.forEachChild(node, nodeVisitor);
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
        const code = yield fs_extra_1.default.readFile(id, 'utf8');
        const ext = path_1.default.extname(id);
        let source;
        if (options.transform &&
            (ext === typescript_1.default.Extension.Ts || ext === typescript_1.default.Extension.Tsx)) {
            typescript_1.default.transpileModule(code, {
                compilerOptions: typescriptTransformOptions,
                transformers: {
                    after: [() => (node) => (source = node)],
                },
            });
        }
        else {
            source = typescript_1.default.createSourceFile(id, code, typescript_1.default.ScriptTarget.Latest, true, typescript_1.default.ScriptKind.TSX);
        }
        typescript_1.default.forEachChild(source, nodeVisitor);
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
function parseDependencyTree(entries, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!Array.isArray(entries)) {
            entries = [entries];
        }
        const currentDirectory = process.cwd();
        const output = {};
        const fullOptions = (0, utils_1.normalizeOptions)(options);
        let resolve = utils_1.simpleResolver;
        if (options.tsconfig) {
            const compilerOptions = typescript_1.default.parseJsonConfigFileContent(typescript_1.default.readConfigFile(options.tsconfig, typescript_1.default.sys.readFile).config, typescript_1.default.sys, path_1.default.dirname(options.tsconfig)).options;
            const host = typescript_1.default.createCompilerHost(compilerOptions);
            resolve = (context, request, extensions) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const module = typescript_1.default.resolveModuleName(request, path_1.default.join(context, 'index.ts'), compilerOptions, host).resolvedModule;
                if (module && module.extension !== typescript_1.default.Extension.Dts) {
                    return module.resolvedFileName;
                }
                else {
                    const filename = yield (0, utils_1.simpleResolver)(context, request, extensions);
                    if (filename === null && module) {
                        return (0, utils_1.simpleResolver)(context, module.resolvedFileName.slice(0, -typescript_1.default.Extension.Dts.length), extensions);
                    }
                    return filename;
                }
            });
        }
        yield Promise.all(entries.map((entry) => G.glob(entry).then((matches) => Promise.all(matches.map((filename) => parseTreeRecursive(currentDirectory, path_1.default.join(currentDirectory, filename), fullOptions, output, resolve))))));
        if (fullOptions.context) {
            return (0, utils_1.shortenTree)(fullOptions.context, output);
        }
        return output;
    });
}
exports.parseDependencyTree = parseDependencyTree;
//# sourceMappingURL=parser.js.map