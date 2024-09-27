import prettier from 'eslint-config-prettier';
import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import tsSortKeys from 'eslint-plugin-typescript-sort-keys';

// noinspection JSUnusedGlobalSymbols
export default tsEslint.config(
    eslint.configs.recommended,
    ...tsEslint.configs.recommended,
    prettier,
    {
        rules: {
            'linebreak-style': ['error', 'unix'],
            'max-depth': ['error', 4],
            'object-curly-spacing': ['error', 'always'],
            'prefer-template': ['error'],
            quotes: ['error', 'single', { avoidEscape: true }],
            semi: ['error', 'always'],
            'sort-keys': ['error', 'asc'],
            'sort-vars': ['error'],
        },
    },
    {
        plugins: {
            tsSortKeys,
        },
        rules: {
            'tsSortKeys/interface': [
                'error',
                'asc',
                {
                    requiredFirst: true,
                },
            ],
            'tsSortKeys/string-enum': ['error'],
        },
    },
);
