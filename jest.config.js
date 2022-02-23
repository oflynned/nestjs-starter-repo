module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.ts',
    '!**/*/*.factory.ts',
    '!**/*/mocks.ts',
    '!**/*/index.ts',
  ],
  testTimeout: 10000,
  coverageDirectory: './coverage',
  testMatch: ['**/?(*.)+(e2e-spec|spec).[jt]s?(x)'],
  testPathIgnorePatterns: ['node_modules', 'dist'],
};
