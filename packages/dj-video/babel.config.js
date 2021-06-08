module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: '>1%, not ie 11, not op_mini all', // https://jamie.build/last-2-versions
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [
    'babel-plugin-styled-components',
    '@babel/plugin-transform-runtime',
  ],
  env: {
    test: {
      plugins: [
        'require-context-hook',
        '@babel/plugin-proposal-optional-chaining',
      ],
    },
  },
};
