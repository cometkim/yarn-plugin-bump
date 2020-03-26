module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint/eslint-plugin',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'max-len': ['error', 80],
    'comma-spacing': ['error', { after: true }],
    'array-bracket-newline': ['error', 'consistent'],
    'object-curly-newline': ['error', {
      'ObjectExpression': 'always',
      'ObjectPattern': {
        'multiline': true,
      },
      'ImportDeclaration': 'never',
      'ExportDeclaration': {
        'multiline': true,
        'minProperties': 3,
      }
    }],
    'object-curly-spacing': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2],
    'semi': 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    'quotes': 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/array-type': ['error', { default:'array-simple' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
