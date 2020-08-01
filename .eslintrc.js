// @ts-check

/** @type {import("eslint").Linter.Config} */
const config = {
    extends: ["plugin:@pinnacle0/baseline"],
    parserOptions: {
        ecmaVersion: 2017,
    },
    overrides: [
        {
            files: ["**/module/*/*/index.ts", "**/module/*/*/index.tsx", "**/module/main/index.ts", "**/module/main/index.tsx"],
            rules: {
                "@typescript-eslint/explicit-function-return-type": ["error"],
            },
        },
        {
            files: ["app/**/*.ts", "app/**/*.tsx"],
            rules: {
                "@typescript-eslint/no-use-before-define": "off",
                "@typescript-eslint/no-var-requires": "off",
            },
        },
    ],
};

module.exports = config;
