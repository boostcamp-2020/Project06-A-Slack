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
    'no-var': 'warn', // var 쓰면 warn
    'no-unused-vars': 'warn', // 사용되지 않은 변수들 체크
    'prefer-const': 'error',
    'no-console': 'warn', // console에 warn
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }], // loop 안에서만 허용
    'no-unused-expressions': 'error', // expression이 사용되지 않은 경우
    'import/prefer-default-export': 'off', // export default off
    'no-param-reassign': 'error', // param 넘어온것 재할당 하는것
    'no-constant-condition': ['error', { checkLoops: false }], // 반복문엔 되고, if문엔 안되고.
    'import/no-unresolved': 'off', // alias 쓸때 error 띄우는것
    'class-methods-use-this': 'off', // 클래스에 this를 안쓰면 스태틱으로 바꿔야한다? no.
    'no-restricted-globals': 'warn',
    'import/extensions': 'off',
  },
};
