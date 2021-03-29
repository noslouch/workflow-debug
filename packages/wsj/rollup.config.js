import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import svgr from '@svgr/rollup'
import { babel } from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'

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
}
