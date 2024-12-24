import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginTypescript from "@typescript-eslint/eslint-plugin";
import eslintParserTypescript from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,ts}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.json",
      },
      parser: eslintParserTypescript,
    },
    plugins: {
      "@typescript-eslint": eslintPluginTypescript,
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];
