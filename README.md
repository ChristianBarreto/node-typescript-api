# node-typescript-api

## 1. Configuration

### 1.1 Git
- `$ git init`
- Use a default`.gitignore`  for Node.js
- `$ git remote set-url origin <url>`

### 1.2 NPM
- `$ npm init`

### 1.3 Typescript
- `$ yarn add -D typescript`
- `$ yarn add -D @types/node`
- Create file: `tsconfig.json` (copy this file)
- Use paths:
```
    "paths": {
      "@src/*": ["./src/*"],
      "@test/*": ["./test/*"]
    },
    "rootDirs": [
      "./src",
      "./test"
    ],
```

### 1.4 Directories
- `/src`
- `/test`

### 1.5 Module-alias 
Allow use @src e @test...
- `$ yarn install module-alias`
- `$ yarn install -D @types/module-alias`
- Create folder and file `/src/util/module-alias.ts` (copy content of the file)

### 1.6 Configure package.json scripts
```
"scripts": {
  "build": "tsc",
  "start": "yarn build && node dist/src/index.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```
### 1.7 ESLint
- `$ yarn add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser`
- Create file`.eslintrc` (copy file content)
- Add to package.json the following commands `lint` and `lint:fix`:
```
  "lint": "eslint ./src ./test --ext .ts",
  "lint:fix": "eslint ./src ./test --ext .ts --fix",
```

### 1.8 TS Node Dev
This dependency creates a kind of repo from dev and compile the diff:
- Install: `$ yarn add -D ts-node-dev`
- Add ao package.json o script:
  - `"start:dev": "ts-node-dev src/index.ts"`

### 1.9 JEST
- `$ yarn add -D jest ts-jest @types/jest`
- Create a global config file for unit tests:
  - `jest.config.js` (copy file content)
- Create a local tests config file for functional tests (e2e)
  - Create `/test/jest.config.js`
- Create Jest setup file. This file is responsible to initialize the server for all the tests.
  - Create `/test/jest-setup.ts`
- Create test command
  - `"test:functional": "jest --projects ./test --runInBand"`
  (runInBand to follow in order instead in parallel to avoid problems changes DB statuses)

### 1.10 Install SuperTest
- Make it not necessary to run a express server to run the tests
- `$ yarn add -D supertest @types/supertest`

### 1.11 Overnight.js
It's a module that adds to Express.js decorators and make it able to create routes with classes and decorators.

- `$ yarn add express body-parser @overnightjs/core`
- `$ yarn add -D @types/express`

### 1.12 Code style with prettier
- `$ yarn add -D prettier`
- Add file on root `.prettierrc.json` (see file content)
- Add new command on `package.json`: 
```
  "style:check": "prettier --check \"src/**/*.ts\" \"test/**/*.ts\"",
  "style:fix": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
```
### 1.13 Configuring Jest for unit tests
- Add script to `package.json`
```
"test:unit": "jest"
```
This config is simple because it uses the global configuration already settled.

### 1.14 Installing Axios
- `$ yarn add axios`
- `$ yarn add -D @types/axios`

## 2 Application development
### 2.1 Configuring the server
- Add the file `server.ts` and `SetupServer` class (see file).

### 2.2 Creating the endpoints
- Add `/controllers` directory and `forecast.ts` file and create the endpoints using the decorators and classes.
- Import the endpoints (controllers) in the SetupServer class.

### 2.3 Functional test setup
- Add a before all to initialize the server after tests
- global.testRequest to make server available
- Create a public method on server to make server available for test
- Adding an "Module Augmentation" to solve the `global.testRequest` issue.
  - Compose an existing type with others to avoid need to change the library type (ex. changing the Express type).
  - Add file `/test/global.d.ts` (d for declarations)
  - Declare the new type importing inline (observe rules for new node versions)

### 2.4 Unit test for client and client development (TDD)
- Before create the service to access the external API, we need to create a unit test to test it: `/src/clients/__tests__/stormGlass.test.ts`.
- This first unit test is created supposing that this service to access the external API is a class with methods to allow access.

**Note:** Create classes to access external services can be a best practice.

- Create directory and file to handle the client API: `/src/clients/stormGlass.ts`
- Axios library has available a contructor, by the way here we create our own class `StormGlass` using an Axios constructor `AxiosStatic`.
- This class expect that we pass an `axios` as parameter.
- Create url params as readonly class attributes.
- On unit test import the axios and create the jest mock function for it.
- Create `fixture/name_of_fixture.json` to mock the unit test response, importing it on test file.
- Check if the test will return the non normalized response.
- We need to normalize the response, so first we normalize the mock response json (the test should fail).
- Create the interface of the StormGlass api (APIs is more used to describe shape of data, to extend) and a new interface of the normalized response.
- Create a new class method to normalized the data (filter, map).
- Create a new class method to validate each point.

### 2.5 Jest Mock with typescript
- We need to create a new variable which is 'axios' declaring its types as `jest.Mocked<typeof axios>`. It binds these two types and make all the types available.