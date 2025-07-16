import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import prettier from "eslint-config-prettier";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tsEslint from "typescript-eslint";
import vueEslintParser from "vue-eslint-parser";
import eslintVitest from "@vitest/eslint-plugin";
import eslintCypress from "eslint-plugin-cypress/flat";

export default [
  // Core ESLint recommended rules
  js.configs.recommended,

  // Vue.js specific linting rules
  ...vue.configs["flat/recommended"],

  // Typescript rules
  ...tsEslint.configs.recommended,
  tsEslint.configs.eslintRecommended, // To disable same rules which are in @eslint/js

  // Prettier configuration to disable conflicting rules
  prettier,

  // Plugins and additional rules
  {
    files: ["**/*.{js,ts,vue}"],
    plugins: {
      "unused-imports": unusedImports,
    },

    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        parser: tsEslint.parser,
        extraFileExtensions: [".vue"],
        project: true,
        tsconfigRootDir: ".",
      },
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    rules: {
      // Allow single word vue component names
      "vue/multi-word-component-names": "off",

      "no-unused-vars": "off",
      // Add rules for unused-imports
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_", // Ignore variables starting with _
          args: "after-used",
          argsIgnorePattern: "^_", // Ignore arguments starting with _
        },
      ],
    },
  },

  {
    // disable type-aware linting on JS files
    ...tsEslint.configs.disableTypeChecked,
    files: ["**/*.js"],
  },

  {
    // Vitest eslint for unit tests
    files: ["**/*.spec.ts"],
    languageOptions: {
      ...eslintVitest.environments.env,
    },
    ...eslintVitest.configs.recommended,
  },

  {
    // Cypress eslint for e2e tests
    files: ["**/*.e2e.ts", "**/*.cy.ts"],
    languageOptions: {
      ...eslintCypress.configs.globals,
    },
    ...eslintCypress.configs.recommended,
  },
];
