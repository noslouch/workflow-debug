/* eslint-disable no-restricted-syntax */
import path from 'path';
import { readdirSync as readdir } from 'fs';

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import url from '@rollup/plugin-url';

// https://github.com/elbywan/wretch/issues/82
const THIS_IS_UNDEFINED = 'THIS_IS_UNDEFINED';

// every component gets its own top level export
// required for tree shaking
const COMPONENTS = path.join('.', 'src', 'components');
const NOT_COMPONENTS = ['__mocks__'];

/**
 * Given a directory, recurse through sub-trees to find directories that contain an index.js file
 * Yield the names of these directories for use as a entry points to the rollup build
 * @function findIndex
 * @param {String} dir
 * @yield {String} file path to a component index file
 */
function* findIndex(dir) {
  const entries = readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const filepath = path.join(dir, entry.name);
    if (entry.isDirectory() && !NOT_COMPONENTS.includes(entry.name)) {
      yield* findIndex(filepath);
    } else if (entry.name === 'index.js') {
      yield dir.replace(`${COMPONENTS}/`, '');
    }
  }
}

export default () => {
  const ENTRIES = {
    index: 'src/index.js',
  };

  for (const entry of findIndex(COMPONENTS)) {
    ENTRIES[entry] = path.join(COMPONENTS, entry);
  }

  return {
    input: ENTRIES,
    output: [
      {
        format: 'cjs',
        dir: 'dist/cjs',
        exports: 'named',
      },
      {
        format: 'es',
        dir: 'dist/es',
      },
    ],
    external: [
      'react',
      'react-dom',
      'react-is',
      'prop-types',
      'styled-components',
      /@babel\/runtime/,
    ],
    plugins: [
      replace(
        {
          'process.env.NODE_ENV': JSON.stringify(
            process.env.NODE_ENV || 'development'
          ),
        },
        { preventAssignment: true }
      ),
      resolve(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'runtime',
      }),
      json(),
      commonjs(),
      url(),
    ],

    onwarn({ loc, code }) {
      if (code === THIS_IS_UNDEFINED && loc?.file.match('wretch')) {
        // eslint-disable-next-line no-useless-return
        return;
      }
    },
  };
};
