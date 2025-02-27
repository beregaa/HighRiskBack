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
    'prettier', // Prettier plugin for formatting
  ],
  extends: [
    'eslint:recommended', // ESLint recommended rules
    'plugin:@typescript-eslint/recommended', // TypeScript recommended rules
    'plugin:prettier/recommended', // Prettier recommended rules
  ],
  ignorePatterns: [
    '**/node_modules/**', // Ignore node_modules
    'dist/**', // Ignore build/dist folders
  ],
  rules: {
    //#region ESLint Rules
    'max-len': [
      'warn',
      {
        code: 120, // Relaxed line length
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
      },
    ],
    'no-console': 'warn', // Allow console logs but with a warning
    'no-debugger': 'warn', // Allow debugger but with a warning
    'spaced-comment': [
      'warn',
      'always',
      {
        markers: ['/', '#region', '#endregion'], // Allow simple comment spacing
      },
    ],
    'no-underscore-dangle': 'off', // Allow underscores in variable names
    'no-param-reassign': 'off', // Allow parameter reassignment
    'consistent-return': 'off', // Relax return statement consistency
    'no-continue': 'off', // Allow continue statements
    'object-curly-newline': 'off', // No strict rule on object curly newlines
    'class-methods-use-this': 'off', // Relax class method rules
    //#endregion

    //#region Import Rules
    'import/extensions': 'off', // Relax file extension rules
    'import/no-default-export': 'off', // Allow default exports
    'import/order': [
      'warn',
      {
        groups: [['builtin', 'external', 'internal']], // Relax import order
        'newlines-between': 'always',
      },
    ],
    'import/prefer-default-export': 'off', // Allow non-default exports
    //#endregion

    //#region TypeScript Rules
    '@typescript-eslint/consistent-type-assertions': 'off', // Relax type assertion rules
    '@typescript-eslint/no-explicit-any': 'warn', // Allow `any` with a warning
    '@typescript-eslint/explicit-function-return-type': 'off', // No need for explicit return types
    '@typescript-eslint/explicit-module-boundary-types': 'off', // No need for explicit module boundary types
    '@typescript-eslint/naming-convention': 'off', // Relax naming convention rules
    '@typescript-eslint/no-unsafe-member-access': 'off', // Allow unsafe member access
    //#endregion
  },
};
