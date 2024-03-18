# node-typescript-api



## Configuration

### Git
- `$ git init`
- Use a default`.gitignore`  for Node.js
- `$ git remote set-url origin <url>`

### NPM
- `$ npm init`

### Typescript
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

### Directories
- `/src`
- `/test`

### Module-alias 
Allow use @src e @test...
- `$ yarn install module-alias`
- `$ yarn install -D @types/module-alias`
- Create folder and file `/src/util/module-alian.ts` (copy content of the file)

### package.json script
```
"scripts": {
  "build": "tsc",
  "start": "yarn build && node dist/src/index.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```
### ESLint
- `$ yarn add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser`
- Create file`.eslintrc` (copy file content)
- Add to package.json the following commands `lint` and `lint:fix`:
```
  "lint": "eslint ./src ./test --ext .ts",
  "lint:fix": "eslint ./src ./test --ext .ts --fix",
```

### TS Node Dev
This dependency creates a kind of repo from dev and compile the diff:
- Install: `$ yarn add -D ts-node-dev`
- Add ao package.json o script:
  - `"start:dev": "ts-node-dev src/index.ts"`

## JEST
- `$ yarn add -D jest ts-jest @types/jest`
- Create a global config file for unit tests:
  - `jest.config.js` (copy file content)
- Create a local tests config file for functional tests (e2e)
  - Create `/test/jest.config.js`
- Create test command
  - `"test:functional": "jest --projects ./test --runInBand"`
  (runInBand to follow in order instead in parallel to avoid problems changes DB statuses)

### Install SuperTest
- Make it not necessary to run a express server to run the tests
- `$ yarn add -D supertest @types/supertest`