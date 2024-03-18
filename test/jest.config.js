const { resolve } = require('path');
const root = resolve(__dirname, '..');
const rootConfig = require(`${root}/jest.config.js`);

module.exports = {...rootConfig, ...{
  rootDir: root,
  displayName: "end2end-tests", // display e2e to differ from the unit
  setupFilesAfterEnv: ["<rootDir>/test/jest-setup.ts"], // define setup file (setup database, server)
  testMatch: ["<rootDir>/test/**/*.test.ts"], // only on this folder
}}