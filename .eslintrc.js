module.exports = {
  root: true,
  extends: [
    require.resolve('@antoree/eslint-config-ant'),
    'plugin:prettier/recommended',
  ],
  rules: {
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-curly-newline': 'off',
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        bracketSpacing: true,
        printWidth: 80,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        useTabs: false,
        endOfLine: 'auto',
        trailingComma: 'all',
      },
    ],
  },
};
