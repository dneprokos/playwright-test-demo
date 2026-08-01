const js = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const playwright = require("eslint-plugin-playwright");

module.exports = [
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "**/test-results/**",
      "**/allure-report/**",
      "**/playwright-report/**",
      "eslint.config.js",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs["flat/recommended"],
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-floating-promises": ["error", { ignoreVoid: true }],
    },
  },
  {
    files: ["tests/**/*.ts"],
    ...playwright.configs["flat/recommended"],
  },
];
