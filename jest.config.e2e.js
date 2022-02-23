const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  testTimeout: 30000,
  testMatch: ['**/?(*.)+(e2e-spec).[jt]s?(x)'],
};
