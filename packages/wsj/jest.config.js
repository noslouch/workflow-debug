module.exports = {
  setupFiles: ['<rootDir>/.jest/register-context.js'],
  moduleNameMapper: {
    '\\.(css|jpg|png|gif)$': '<rootDir>/.jest/empty_loader.js',
    '\\.svg$': '<rootDir>/.jest/svgrMock.js',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!@newscorp-ghfb/dj-design-tokens)'],
}
