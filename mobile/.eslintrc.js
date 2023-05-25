module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true,
    'react-native/react-native': true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'plugin:react-native/all'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['@typescript-eslint', 'react', 'react-native'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    'react-native/no-raw-text': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react-native/no-inline-styles': 'off',
    '@typescript-eslint/no-empty-function': 'off'
  }
}
