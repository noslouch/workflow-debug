module.exports = {
  webpackFinal: (config) => {
    return {
      ...config,
      node: {
        __dirname: true,
        __filename: true,
      },
    };
  },
  stories: ['../src/**/*stories.js'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-actions',
    '@storybook/addon-storysource',
    '@storybook/addon-essentials',
    'storybook-dark-mode',
  ],
};
