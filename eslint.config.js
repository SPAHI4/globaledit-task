import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactJsx from 'eslint-plugin-react/configs/jsx-runtime.js';
import react from 'eslint-plugin-react/configs/recommended.js';
import eslintPluginImport from 'eslint-plugin-import';
import globals from 'globals';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import ts from 'typescript-eslint';

export default [
  { languageOptions: { globals: globals.browser } },
  js.configs.recommended,
  ...ts.configs.recommended,
  eslintPluginPrettierRecommended,
  ...fixupConfigRules([
    {
      ...react,
      settings: {
        react: { version: 'detect' },
      },
    },
    reactJsx,
  ]),
  {
    plugins: {
      'react-hooks': reactHooks,
      import: fixupPluginRules(eslintPluginImport),
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react/no-children-prop': 'off',
      'react/prop-types': 'off',

      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          warnOnUnassignedImports: true,
          groups: ['builtin', 'external', 'parent', 'sibling', 'internal', 'index', 'object', 'type', 'unknown'],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'external',
              position: 'after',
            },
          ],
        },
      ],
    },
  },
  { ignores: ['dist/'] },
];
