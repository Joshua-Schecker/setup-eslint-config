#!/usr/bin/env node
/* eslint-disable no-console */
const { setup } = require('./src');

const packageInfo = require('./package.json');

setup({
  name: 'setup-eslint-config',
  prompts: [{ type: 'confirm', name: 'prettier', message: 'Use prettier?' }],
  packageInfo,
  createEslintConfig: config => {
    const extending = ['relekang'];
    if (config.prettier) {
      extending.push('relekang/prettier');
    }
    return { extends: extending };
  },
  createDependencyList: config => {
    const dependencies = ['eslint'];
    if (config.prettier) {
      dependencies.push('eslint-config-prettier');
      dependencies.push('eslint-plugin-prettier');
      dependencies.push('prettier');
    }
    return dependencies;
  },
}).catch(error => {
  console.error(error);
  process.exit(1);
});
