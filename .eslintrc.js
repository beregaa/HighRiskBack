module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Use the TypeScript parser
  parserOptions: {
    project: 'tsconfig.json', // Point to your tsconfig.json
    tsconfigRootDir: __dirname, // Set the root directory for TypeScript
    sourceType: 'module', // Use ES modules
  },
  plugins: [
    '@typescript-eslint', // TypeScript ESLint plugin
    'sonarjs', // SonarJS plugin for code quality
    'jest', // Jest plugin for testing
    'prettier', // Prettier plugin for formatting
  ],
  extends: [
    'eslint:recommended', // ESLint recommended rules
    'plugin:@typescript-eslint/recommended', // TypeScript recommended rules
    'plugin:@typescript-eslint/strict-type-checked', // Strict TypeScript rules
    'plugin:@typescript-eslint/stylistic-type-checked', // Stylistic TypeScript rules
    'plugin:jest/recommended', // Jest recommended rules
    'plugin:sonarjs/recommended-legacy', // SonarJS recommended rules
    'plugin:prettier/recommended', // Prettier recommended rules
    'plugin:@darraghor/nestjs-typed/recommended', // NestJS-specific rules
  ],
  ignorePatterns: [
    '**/node_modules/**', // Ignore node_modules
    'dist/**', // Ignore build/dist folders
    '.eslintrc.js', // Ignore ESLint config file
  ],
  rules: {
    //#region ESLint Rules
    'class-methods-use-this': 'error', // Enforce class methods to use `this`
    'consistent-return': 'error', // Enforce consistent return statements
    'func-names': ['error', 'always'], // Require named function expressions
    'max-len': [
      'error',
      {
        code: 100, // Enforce a maximum line length of 100
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
      },
    ],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }], // Enforce newlines in chained calls
    'no-await-in-loop': 'error', // Disallow `await` inside loops
    'no-continue': 'error', // Disallow `continue` statements
    'no-param-reassign': 'error', // Disallow reassigning function parameters
    'no-restricted-syntax': [
      'error',
      'ForInStatement', // Disallow `for...in` loops
      'LabeledStatement', // Disallow labeled statements
      'WithStatement', // Disallow `with` statements
    ],
    'no-underscore-dangle': 'error', // Disallow dangling underscores in identifiers
    'no-void': 'error', // Disallow `void` operators
    'object-curly-newline': [
      'error',
      {
        consistent: true, // Enforce consistent line breaks in object literals
      },
    ],
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['/', '#region', '#endregion'], // Enforce spacing in comments
      },
    ],
    //#endregion

    //#region Import Rules
    'import/extensions': ['error', 'never'], // Disallow file extensions in imports
    'import/named': 'error', // Enforce named imports
    'import/no-default-export': 'error', // Disallow default exports
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external', 'internal']], // Enforce import order
        'newlines-between': 'always', // Require newlines between import groups
        alphabetize: {
          order: 'asc', // Alphabetize imports
          caseInsensitive: true,
        },
      },
    ],
    'import/prefer-default-export': 'off', // Disallow preferring default exports
    //#endregion

    //#region TypeScript Rules
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as', // Enforce `as` type assertions
      },
    ],
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true, // Enforce lines between class members
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['strictCamelCase'], // Enforce camelCase for all identifiers
      },
      {
        selector: 'variable',
        format: ['strictCamelCase', 'UPPER_CASE'], // Allow UPPER_CASE for constants
      },
      {
        selector: 'typeLike',
        format: ['StrictPascalCase'], // Enforce PascalCase for types
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'], // Enforce UPPER_CASE for enum members
      },
    ],
    '@typescript-eslint/no-extraneous-class': 'error', // Disallow unnecessary classes
    '@typescript-eslint/no-unsafe-member-access': 'error', // Disallow unsafe member access
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowNumber: true, // Allow numbers in template expressions
      },
    ],
    '@typescript-eslint/no-explicit-any': 'error', // Disallow `any` type
    '@typescript-eslint/explicit-function-return-type': 'error', // Require explicit return types
    '@typescript-eslint/explicit-module-boundary-types': 'error', // Require explicit module boundary types
    //#endregion

    //#region NestJS-Specific Rules
    '@darraghor/nestjs-typed/injectable-should-be-provided': 'error', // Ensure injectable classes are provided
    '@darraghor/nestjs-typed/controllers-should-supply-api-tags': 'error', // Ensure controllers have API tags
    '@darraghor/nestjs-typed/api-property-matches-property-optionality': 'error', // Ensure API properties match optionality
    '@darraghor/nestjs-typed/api-method-should-specify-api-response': 'error', // Ensure API methods specify responses
    //#endregion

    //#region SonarJS Rules
    'sonarjs/no-duplicate-string': 'error', // Disallow duplicate strings
    'sonarjs/cognitive-complexity': ['error', 15], // Enforce low cognitive complexity
    //#endregion
  },
};