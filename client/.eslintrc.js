const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-one-expression-per-line': 'off',
    'prettier/prettier': 'error',
    'no-console': 'warn',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-unused-expressions': ['warn'],
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
    'no-constant-condition': ['error', { checkLoops: false }],
    'no-restricted-globals': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 리액트 컴포넌트 리턴 값 지정안하면 뜸
    'no-use-before-define': ['warn'], // import React할 때 에러떠서 warn으로 변경
    '@typescript-eslint/no-use-before-define': ['warn'],
    'import/prefer-default-export': 'off', // 한 개만 export할때는 export default를 쓰도록 하는 옵션
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: path.join(__dirname, './tsconfig.json'), // tsconfig 옵션을 감지하도록 추가
      },
    },
  },
  ignorePatterns: ['node_modules', 'babel.config.js', 'webpack.config.js', '.eslintrc.js'],
};
