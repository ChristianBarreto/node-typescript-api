# node-typescript-api



## Configuration

### Git
- `$ git init`
- Usar um `.gitignore` padrão para Node.js
- `$ git remote set-url origin <url>`

### NPM
- `$ npm init`

### Typescript
- `$ yarn add -D typescript`
- `$ yarn add -D @types/node`
- Criar arquivo `tsconfig.json` (copiar o que está nesta repo)
- Usar paths:
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
Permite usar @src e @test...
- `$ yarn install module-alias`
- `$ yarn install -D @types/module-alias`
- Criar pasta e arquivo `/src/util/module-alian.ts` (copiar o que está nesta repo)

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
- Criar arquivo `.eslintrc` (copiar o que está nesta repo)
- Add ao package.json os scripts o lint e o lint:fix:
```
  "lint": "eslint ./src ./test --ext .ts",
  "lint:fix": "eslint ./src ./test --ext .ts --fix",
```

### TS Node Dev
Cria uma repo do dev e compila a diff
- `$ yarn add -D ts-node-dev`
- Add ao package.json o script:
  - `"start:dev": "ts-node-dev src/index.ts"`
