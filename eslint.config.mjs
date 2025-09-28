import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,jsx}'],
		plugins: { js },
		extends: ['js/recommended'],
		languageOptions: { 
			globals: globals.browser 
		},
		rules: {
			'semi': ['warn', 'never'],
			'indent': ['warn', 'tab', { 'SwitchCase': 1 }],
			'quotes': ['warn', 'single'],
			'no-else-return': ['error', { 'allowElseIf': false }],
			'no-shadow': ['error'],
			'react-hooks/exhaustive-deps': 'off',
			'space-before-function-paren': ['warn'],
			'eslint-disable react/prop-types': 'warn'
		}
	},
	pluginReact.configs.flat.recommended,
])