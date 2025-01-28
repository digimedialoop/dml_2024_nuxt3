// eslint.config.js
import eslintPluginVue from "eslint-plugin-vue";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    files: ["src/**/*.vue", "src/**/*.js"],
    plugins: {
      vue: eslintPluginVue,
      prettier: eslintPluginPrettier,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    rules: {
      ...eslintPluginVue.configs["vue3-recommended"].rules, // Vue 3 empfohlene Regeln
      ...eslintConfigPrettier.rules, // Prettier-Regeln
      "prettier/prettier": "error", // Prettier Fehler als Linting Fehler behandeln
    },
  },
];
