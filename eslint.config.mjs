import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // https://typescript-eslint.io/rules/consistent-indexed-object-style
      "@typescript-eslint/consistent-indexed-object-style": ["error", "record"],

      // https://typescript-eslint.io/rules/consistent-type-imports
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],

      // https://typescript-eslint.io/rules/no-base-to-string
      "@typescript-eslint/no-base-to-string": "error",

      // https://typescript-eslint.io/rules/no-duplicate-type-constituents
      "@typescript-eslint/no-duplicate-type-constituents": "error",

      // https://typescript-eslint.io/rules/no-empty-function
      "@typescript-eslint/no-empty-function": "error",

      // https://typescript-eslint.io/rules/no-empty-object-type
      "@typescript-eslint/no-empty-object-type": "error",

      // https://typescript-eslint.io/rules/no-explicit-any
      "@typescript-eslint/no-explicit-any": "error",

      // https://typescript-eslint.io/rules/no-floating-promises/
      "@typescript-eslint/no-floating-promises": ["error", { ignoreVoid: true }],

      // https://typescript-eslint.io/rules/no-misused-promises
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],

      // https://typescript-eslint.io/rules/no-unused-vars
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { vars: "all", args: "after-used", ignoreRestSiblings: true }],

      // https://typescript-eslint.io/rules/prefer-find
      "@typescript-eslint/prefer-find": "error",

      // https://typescript-eslint.io/rules/prefer-nullish-coalescing
      "@typescript-eslint/prefer-nullish-coalescing": "error",

      // https://typescript-eslint.io/rules/prefer-optional-chain
      "@typescript-eslint/prefer-optional-chain": "error",

      // https://typescript-eslint.io/rules/require-await
      "require-await": "off",
      "@typescript-eslint/require-await": "error",

      // https://typescript-eslint.io/rules/return-await
      "@typescript-eslint/return-await": ["error", "always"],

      // https://typescript-eslint.io/rules/restrict-template-expressions
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowAny: false,
          allowBoolean: false,
          allowNullish: false,
          allowNumber: true,
          allowRegExp: false,
        },
      ],
    },
  },
  prettier,
]);

export default eslintConfig;
