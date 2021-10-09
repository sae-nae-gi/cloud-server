const typescriptEslintRecommended = require("@typescript-eslint/eslint-plugin")
  .configs.recommended;
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
    },
    extends: ["prettier"],
    parser: "babel-eslint",
    parserOptions: {
        ecmaFeatures: {
        legacyDecorators: true,
        },
        allowImportExportEverywhere: true,
    },
    "plugins": [
        "@typescript-eslint",
    ],
    settings: {
    "import/resolver": {
        node: {
            extensions: [".js", ".ts"],
        },
        },
    },
    rules: {
        camelcase: ["error", { properties: "never", allow: ["WM_videoPlayer"] }],
        "comma-dangle": ["error", "always-multiline"],
        "class-methods-use-this": "off",
        curly: ["error", "all"],
        "function-paren-newline": "off",
        "global-require": "off",
        "guard-for-in": "off",
        "lines-between-class-members": "off",
        "no-alert": "off",
        "no-console": ["error", { allow: ["warn", "error"] }],
        "no-constant-condition": ["error", { checkLoops: false }],
        "no-param-reassign": ["error", { props: false }],
        "no-plusplus": "off",
        "no-prototype-builtins": "off",
        "no-restricted-syntax": [
          "error",
          {
            selector: "ForOfStatement",
            message:
              "iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.",
          },
          {
            selector: "LabeledStatement",
            message:
              "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
          },
          {
            selector: "WithStatement",
            message:
              "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
          },
        ],
        "no-shadow": ["error", { hoist: "all" }],
        "no-use-before-define": ["error", { functions: false }],
        "no-unused-expressions": ["error", { allowTaggedTemplates: true }],
        "prefer-const": [
          "error",
          { destructuring: "all", ignoreReadBeforeAssign: true },
        ],
        "prefer-destructuring": "off",
        "spaced-comment": [
          "error",
          "always",
          {
            line: {
              exceptions: ["-", "+"],
              markers: ["=", "!"],
            },
            block: {
              exceptions: ["-", "+"],
              markers: ["=", "!"],
              balanced: true,
            },
          },
        ],
        strict: "off",
        "implicit-arrow-linebreak": "off",
        "import/named": "off",
        "import/no-dynamic-require": "off",
        "import/no-extraneous-dependencies": "off",
        "import/no-unresolved": "off",
        "import/prefer-default-export": "off",
        "max-classes-per-file": "off",
      },
    overrides: [
    {
        files: ["**/*.ts"],
        parser: "@typescript-eslint/parser",
        parserOptions: {
        sourceType: "module",
        project: [
            "./tsconfig.json",
            "packages/@watcha/wheat/tsconfig.json",
            "packages/@watcha/malt/tsconfig.json",
            "packages/@watcha/luna/tsconfig.json",
        ],
        },
        plugins: ["@typescript-eslint"],
        rules: Object.assign(typescriptEslintRecommended.rules, {
        "@typescript-eslint/naming-convention": [
            "error",
            {
            selector: "default",
            format: ["camelCase", "PascalCase"],
            leadingUnderscore: "allow",
            trailingUnderscore: "allow",
            },
            {
            selector: "variable",
            format: ["camelCase", "UPPER_CASE", "PascalCase"],
            leadingUnderscore: "allow",
            trailingUnderscore: "allow",
            },
            {
            selector: "parameter",
            format: ["camelCase", "PascalCase"],
            leadingUnderscore: "allow",
            trailingUnderscore: "allow",
            },
            {
            selector: "property",
            format: ["camelCase", "UPPER_CASE", "snake_case", "PascalCase"],
            leadingUnderscore: "allow",
            trailingUnderscore: "allow",
            },
            {
            selector: "enum",
            format: ["UPPER_CASE", "PascalCase"],
            },
            {
            selector: "enumMember",
            format: ["UPPER_CASE", "camelCase"],
            },
            {
            selector: "typeLike",
            format: ["PascalCase"],
            },
        ],
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/consistent-type-assertions": [
            "error",
            {
            assertionStyle: "as",
            objectLiteralTypeAssertions: "never",
            },
        ],
        "@typescript-eslint/consistent-type-definitions": [
            "error",
            "interface",
        ],
        "@typescript-eslint/no-explicit-any": "off", // 일단 off 전부 ts 로 넘어가고 다시 생각해 보는것으로
        "@typescript-eslint/explicit-member-accessibility": [
            "error",
            {
            accessibility: "no-public",
            },
        ], // public 을 굳이 쓸 필요가 이씅ㄹ까?
        "@typescript-eslint/generic-type-naming": "off",
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/interface-name-prefix": "off", // 일단 off 합니다. 추후 한꺼번에 prefix 를 붙이도록.
        // "error",
        // "always"
        // ],
        "@typescript-eslint/member-ordering": [
            "error",
            {
            default: [
                // statics
                // field
                "private-abstract-field",
                "protected-abstract-field",
                "public-abstract-field",
                "private-instance-field",
                "protected-instance-field",
                "public-instance-field",

                // constructor
                "private-constructor",
                "protected-constructor",
                "public-constructor",

                // method
                "private-abstract-method",
                "protected-abstract-method",
                "public-abstract-method",
                "private-instance-method",
                "protected-instance-method",
                "public-instance-method",
            ],
            },
        ],
        "@typescript-eslint/no-inferrable-types": "off", // type 선언과 초기화 동시에 가능
        "@typescript-eslint/no-parameter-properties": "error", // type 선언과 초기화 동시에 가능
        "@typescript-eslint/prefer-readonly": [
            "error",
            { onlyInlineLambdas: true },
        ],
        "@typescript-eslint/explicit-function-return-type": ["off"],
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/ban-ts-ignore": "off", // 임시로 off
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/prefer-regexp-exec": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-var-requires": "off",
        camelcase: "off",
        "no-use-before-define": "off",
        }),
    },
    {
        files: ["*.test.js", "*.spec.js", "*.spec.ts", "*.test.ts"],
        rules: {
        "no-undef": "off",
        "no-unused-expressions": "off",
        "no-unused-vars": "off",
        "import/first": "off",
        "import/order": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/no-empty-function": "off",
        },
    },
    ],
};