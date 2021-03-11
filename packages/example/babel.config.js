module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: '>1%, not ie 11, not op_mini all', // https://jamie.build/last-2-versions
      },
    ],
    '@babel/preset-react',
  ],
  plugins: ['@babel/plugin-transform-runtime', 'babel-plugin-styled-components'],
}
