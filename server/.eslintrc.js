const path = require('path');

module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error', // prettier, eslint 충돌 없애는 것
    'no-console': 'warn', // console에 warn
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }], // loop 안에서만 허용
    'class-methods-use-this': 'off', // 클래스에 this를 안쓰면 스태틱으로 바꿔야한다? no.
    'no-restricted-globals': 'warn',
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: path.join(__dirname, './tsconfig.json'),
      },
    },
  },
  ignorePatterns: ['node_modules', 'babel.config.js', 'webpack.config.js', '.eslintrc.js'],
};
