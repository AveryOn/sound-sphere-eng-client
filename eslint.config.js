// import js from '@eslint/js'
// import vue from 'eslint-plugin-vue'
// import tsPlugin from '@typescript-eslint/eslint-plugin'
// import tsParser from '@typescript-eslint/parser'
// import vueESLintParser from 'vue-eslint-parser'
// import prettierPlugin from 'eslint-plugin-prettier'


// export default [
//   {
//     ignores: ['dist', 'node_modules', '*config*'],
//   },
//   js.configs.recommended,
//   {
//     files: ['**/*.ts', '**/*.vue'],
//     languageOptions: {
//       globals: {
//         console: 'readonly',
//         process: 'readonly',
//         module: 'readonly',
//       },
//       ecmaVersion: 'latest',
//       parser: vueESLintParser, // 👈 добавил это
//       parserOptions: {
//         parser: tsParser,
//         ecmaVersion: 'latest',
//         sourceType: 'module',
//       },
//     },
//     plugins: {
//       '@typescript-eslint': tsPlugin,
//       vue,
//       prettier: prettierPlugin,
//     },
//     rules: {
//       ...tsPlugin.configs.recommended.rules,
//       ...vue.configs.base.rules,
//       'vue/html-indent': ['error', 2],
//       'vue/max-attributes-per-line': ['error', { singleline: 3 }],
//       'vue/comment-directive': 'off',
//       'no-undef': 'off', // для `console`, `defineStore`, и т.д.
//       '@typescript-eslint/no-explicit-any': 'off',
//       '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
//     },
//   },
// ]



import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vueESLintParser from 'vue-eslint-parser'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  {
    ignores: ['dist', 'node_modules', '*config*'],
  },
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.vue'],
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
        module: 'readonly',
      },
      ecmaVersion: 'latest',
      parser: vueESLintParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      vue,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...vue.configs.base.rules,
      'prettier/prettier': 'error',
      'vue/html-indent': ['error', 2],
      'vue/max-attributes-per-line': ['error', { singleline: 3 }],
      'vue/comment-directive': 'off',
      'no-undef': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
]
