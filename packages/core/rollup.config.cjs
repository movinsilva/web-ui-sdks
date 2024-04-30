/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

const commonjs = require('@rollup/plugin-commonjs');
const dynamicImportVars = require('@rollup/plugin-dynamic-import-vars');
const nodeResolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const dts = require('rollup-plugin-dts');

const pkg = require('./package.json');

module.exports = [
  {
    cache: false,
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        inlineDynamicImports: true,
        sourcemap: true,
      },
      {
        file: pkg.umd,
        format: 'umd',
        inlineDynamicImports: true,
        name: 'core',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        inlineDynamicImports: true,
        sourcemap: true,
      },
    ],
    plugins: [nodeResolve(), commonjs(), dynamicImportVars(), typescript({tsconfig: './tsconfig.lib.json'})],
  },
  {
    cache: false,
    input: 'dist/esm/types/index.d.ts',
    output: [{file: 'dist/index.d.ts', format: 'esm'}],
    plugins: [dts.default()],
  },
];
