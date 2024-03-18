const { resolve } = require('path');
const root = resolve(__dirname);
module.exports = {
  rootDir: root, // define rootdir as root declared above
  displayName: 'root-tests', // label to identigy unit (global) ou functional
  testMatch: ['<rootDir>/src/**/*.test.ts'], // Jest only matches test files on these directories
  testEnvironment: 'node',
  clearMocks: true, // clean  mocks as default
  preset: 'ts-jest', // link ts jest
  moduleNameMapper: { // 
    '@src/(.*)': '<rootDir>/src/$1', // alias to import things
    '@test/(.*)': '<rootDir>/test/$1', // alias to import things
  },
};