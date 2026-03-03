import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,

      /*
       * Use type-aware rules (`recommendedTypeChecked`) instead of the
       * syntactic-only `recommended` set. This enables semantic checks such as:
       *  - no-floating-promises   (unawaited async calls)
       *  - no-unsafe-assignment   (any propagation)
       *  - no-misused-promises    (promises used as booleans)
       * These catch real bugs that `recommended` alone misses.
       */
      ...tseslint.configs.recommendedTypeChecked,

      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        // Required for type-aware lint rules
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Disallow `any` escapes that defeat the strict TypeScript config
      '@typescript-eslint/no-explicit-any': 'error',

      // Warn on floating promises (common async bug)
      '@typescript-eslint/no-floating-promises': 'warn',

      // Enforce consistent import style
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
    },
  },
])
