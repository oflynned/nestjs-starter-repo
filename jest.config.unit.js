const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  testMatch: ['**/?(*.)+(spec).[jt]s?(x)'],
};
