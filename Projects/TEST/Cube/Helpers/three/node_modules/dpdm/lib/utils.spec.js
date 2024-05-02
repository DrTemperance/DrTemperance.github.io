"use strict";
/*!
 * Copyright 2019 acrazing <joking.young@gmail.com>. All rights reserved.
 * @since 2019-07-17 18:45:47
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = require("path");
const utils_1 = require("./utils");
describe('util', () => {
    it('should resolve correctly', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const ext = ['', '.js', '.jsx', '.ts', '.tsx', '.json'];
        const local = yield (0, utils_1.simpleResolver)(__dirname, './bin/dpdm', ext);
        const index = yield (0, utils_1.simpleResolver)(__dirname, '.', ext);
        yield fs_extra_1.default.outputJSON('node_modules/dpdm-ut-parent/package.json', {
            name: 'dpdm-ut-parent',
            version: '1.0.0',
            main: 'index.js',
            dependencies: {
                'dpdm-ut-deep': '^1.0.0',
            },
        });
        yield fs_extra_1.default.outputFile('node_modules/dpdm-ut-parent/index.js', '');
        yield fs_extra_1.default.outputJSON('node_modules/dpdm-ut-parent/node_modules/dpdm-ut-deep/package.json', {
            name: 'dpdm-ut-deep',
            version: '1.0.0',
            main: 'index.js',
        });
        yield fs_extra_1.default.outputFile('node_modules/dpdm-ut-parent/node_modules/dpdm-ut-deep/index.js', '');
        yield fs_extra_1.default.outputJSON('node_modules/dpdm-ut-deep/package.json', {
            name: 'dpdm-ut-deep',
            version: '2.0.0',
            main: 'index.js',
        });
        yield fs_extra_1.default.outputFile('node_modules/dpdm-ut-deep/index.js', '');
        const pkg = yield (0, utils_1.simpleResolver)(__dirname, 'dpdm-ut-parent', ext);
        const deepPkg = yield (0, utils_1.simpleResolver)((0, path_1.dirname)(pkg), 'dpdm-ut-deep', ext);
        const notFound = yield (0, utils_1.simpleResolver)(__dirname, './utils.tsx', ext);
        expect([local, index, pkg, deepPkg, notFound]).toEqual([
            (0, path_1.join)(__dirname, 'bin/dpdm.ts'),
            (0, path_1.join)(__dirname, 'index.ts'),
            (0, path_1.join)(__dirname, '../node_modules/dpdm-ut-parent/index.js'),
            (0, path_1.join)(__dirname, '../node_modules/dpdm-ut-parent/node_modules/dpdm-ut-deep/index.js'),
            null,
        ]);
    }));
});
//# sourceMappingURL=utils.spec.js.map