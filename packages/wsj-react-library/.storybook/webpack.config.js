const path = require('path')

module.exports = ({ config }) => {
  // exclude default svg loader
  const fileLoaderRule = config.module.rules.find(
    (rule) => rule.loader && rule.loader.match('file-loader') && rule.test && rule.test.test('.svg')
  )
  fileLoaderRule.exclude = /\.svg$/

  // add our loader that uses svgr
  config.module.rules.push({
    test: /\.svg$/,
    enforce: 'pre',
    loader: require.resolve('@svgr/webpack'),
    options: {
      icon: true,
    },
  })

  return config
}
