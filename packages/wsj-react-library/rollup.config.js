import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import svgr from '@svgr/rollup'
import { babel } from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import postcss from 'rollup-plugin-postcss'

// https://github.com/elbywan/wretch/issues/82
const THIS_IS_UNDEFINED = 'THIS_IS_UNDEFINED'

export default {
  input: 'src/index.js',
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
  external: ['react', 'react-dom', 'react-is', 'prop-types', 'styled-components', /@babel\/runtime/],
  plugins: [
    postcss({
      plugins: [],
    }),
    replace(
      {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
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
    svgr(),
  ],

  onwarn({ loc, code }) {
    if (code === THIS_IS_UNDEFINED && loc?.file.match('wretch')) {
      return
    }
  },
}
