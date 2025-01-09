const js = require("@eslint/js");
const vue = require("eslint-plugin-vue");
const prettier = require("eslint-config-prettier");
const unusedImports = require("eslint-plugin-unused-imports");
const globals = require("globals");

module.exports = [
    // Core ESLint recommended rules
    js.configs.recommended,

    // Vue.js specific linting rules
    ...vue.configs["flat/recommended"],

    // Prettier configuration to disable conflicting rules
    prettier,

    // Plugins and additional rules
    {
        plugins: {
            "unused-imports": unusedImports,
        },

        languageOptions: {
            ecmaVersion: 2022,
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },

        rules: {
            "no-unused-vars": "off",
            // Add rules for unused-imports
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    varsIgnorePattern: "^_", // Ignore variables starting with _
                    args: "after-used",
                    argsIgnorePattern: "^_", // Ignore arguments starting with _
                },
            ],
        },
    },
];