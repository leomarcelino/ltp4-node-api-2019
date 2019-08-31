# Restful Node.js API

## Como baixar o projeto

1. Clone o repositório do Github https://github.com/leomarcelino/ltp4-node-api-2019.git

```
git clone https://github.com/leomarcelino/ltp4-node-api-2019.git
```

2. Entre no diretório do projeto:

```
cd ltp4-node-api-2019
```

3. Instale os módulos de depêndencia no Node.js

Usando o yarn

```
yarn
```

ou NPM

```
npm install
```

4. Abra o projeto com o Visual Studio Code

```
code .
```

5. Edite o arquivo **src/config/database.js** e coloque as configurações do seu servidor MongoDB.

```javascript
export default {
  uri:
    'mongodb+srv://admin:admin123@cluster0-rium5.mongodb.net/test?retryWrites=true&w=majority',
}
```

6. Para iniciar o servidor execute o comando:

```
yarn dev
```

ou

```
npm run dev
```

## Ferramentas e Módulos utilizados

- Node.js - https://nodejs.org
- Yarn - https://yarnpkg.com
- Visual Studio Code - https://code.visualstudio.com/
- MongoDB - https://www.mongodb.com/
- babel - https://babeljs.io/
- babel-node - https://babeljs.io/docs/en/babel-node
- nodemon - https://nodemon.io/
- express - https://expressjs.com/
- mongoose - https://mongoosejs.com/
- eslint - https://eslint.org/
- prettier - https://prettier.io/
