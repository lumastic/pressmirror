// eslint-disable-next-line @typescript-eslint/no-var-requires
const configs = require("eslint-plugin-mdx/lib/configs");

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: "detect"
    },
    "mdx/code-blocks": true,
    "mdx/language-mapper": {}
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "plugin:mdx/recommended"
  ],
  rules: {},
  overrides: [
    {
      files: ["*.md"],
      rules: {
        "prettier/prettier": [
          2,
          {
            // unnecessary if you're not using `eslint-plugin-prettier`, but required if you are
            parser: "markdown"
          }
        ]
      }
    },
    {
      files: ["*.mdx"],
      ...configs.overrides
    },
    {
      files: "**/*.{md,mdx}/**",
      ...configs.overrides
    }
  ]
};
