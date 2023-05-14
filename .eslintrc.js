module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	settings: {
		react: {
			version: "detect",
		},
	},
	extends: [
		'plugin:react/recommended',
		'xo',
	],

	overrides: [
		{
			extends: [
				'xo-typescript',
			],
			files: [
				'*.ts',
				'*.tsx',
			],
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: 'tsconfig.json'
	},
	plugins: [
		'react',
	],
	rules: {
		'react/jsx-indent': [2, 4],
		'indent': 'off',
		'@typescript-eslint/indent': ['error', 4, {
			// typescript docs indent the case from the switch
			// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-8.html#example-4
			SwitchCase: 1,
			flatTernaryExpressions: false,
			ignoredNodes: [],
		}],
		'react/jsx-filename-extension': [2, { "extensions": [".js", ".jsx", ".tsx"] }],
		'import/no-unresolved': 'off',
		'import/prefer-default-export': 'off',
		'no-unused-vars': 'warn',
		'react/require-default-props': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-indent-props': [2, 4],
		'react/jsx-props-no-spreading': 'warn',
		'react/function-component-definition': 'off',
		'no-shadow': 'off',
		'import/extensions': 'off',
		'no-underscore-dangle': 'off',
		'import/no-extraneous-dependencies': 'off'
	},
	globals: {
		'__IS_DEV__': true
	}
};
