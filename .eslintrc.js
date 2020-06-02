module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'plugin:@typescript-eslint/recommended'
	],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module'
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'quotes': ['error', 'single', {
			avoidEscape: true,
			allowTemplateLiterals: true
		}],
		'space-before-function-paren': 'off',
		'object-curly-spacing': ['error', 'always']
	}
}
