/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com).
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
const image = require('@rollup/plugin-image');
const nodeResolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const dts = require('rollup-plugin-dts');
const styles = require('rollup-plugin-styles');

const pkg = require('./package.json');

module.exports = [
  {
    cache: false,
    input: 'src/index.ts',
    onwarn(warning, warn) {
      // Suppress this error message... there are hundreds of them
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
      // Use default for everything else
      warn(warning);
    },
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        inlineDynamicImports: true,
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        inlineDynamicImports: true,
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve({preferBuiltins: true}),
      commonjs(),
      typescript({tsconfig: './tsconfig.lib.json'}),
      styles(),
      image(),
    ],
  },
  {
    cache: false,
    external: [/\.(sass|scss|css)$/] /* ignore style files */,
    input: 'dist/esm/types/index.d.ts',
    output: [{file: 'dist/index.d.ts', format: 'esm'}],
    plugins: [dts.default()],
  },
];
