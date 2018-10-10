# setup-eslint-config

## Installation

```
npm install setup-eslint-config
# or
yarn add setup-eslint-config
```

## Usage

Below is an example with the basic usage. The prompts property is passed on to 
the [prompts][] package, thus read their documentation on available options.
The result of the prompts are passed to functions as `config`. The config object
also contains a few other fields:

* yarn - is there a yarn.lock file in the directory
* babel - is there a .babelrc file in the directory
* typescript - is there a tsconfig.json file in the directory
* flowtype - is there a .flowconfig file in the directory

```javascript
const {setup} = require('setup-eslint-config')

setup({
  name: "eslint-config-relekang",
  prompts: [
    { type: 'confirm', name: 'prettier', message: 'Use prettier?' },
  ],
  createEslintConfig: (config) => {
      const extending = ["relekang"]
      if (config.prettier) {
        extending.push("relekang/prettier");
      }
      return {extends: extending}
  },
  createDependencyList: (config) => {
    const dependencies = ['eslint'];
    if (config.prettier) {
      dependencies.push('eslint-config-prettier');
      dependencies.push('eslint-plugin-prettier');
      dependencies.push('prettier');
    }
    return dependencies;
  }
}).catch(error => {
    console.error(error.message)
    process.exit(1)
})
```

[prompts]: https://www.npmjs.com/package/prompts
