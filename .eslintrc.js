module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  ignorePatterns: [
    '/node_modules/**/*',
    '/dist/**/*',
    '/prisma/**/*'
  ],
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname
  },
  plugins: [
    '@typescript-eslint',
    'import'
  ],
  rules:{

  }
}
