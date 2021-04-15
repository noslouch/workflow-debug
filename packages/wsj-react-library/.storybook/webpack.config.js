module.exports = ({ config }) => {
  // exclude default svg loader
  const fileLoaderRule = config.module.rules.find(
    (rule) => rule.loader && rule.loader.match('file-loader') && rule.test && rule.test.test('.svg')
  );
  fileLoaderRule.exclude = /\.svg$/;

  // add our loader that uses svgr
  config.module.rules.push({
    test: /\.svg$/,
    loader: ['@svgr/webpack', 'url-loader'],
  });

  return config;
};
