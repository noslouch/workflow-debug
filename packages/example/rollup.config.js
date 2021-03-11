import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'

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
    resolve(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
    }),
    commonjs(),
  ],
}
