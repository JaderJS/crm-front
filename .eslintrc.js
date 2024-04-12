module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"next"
	],
	overrides: [
		{
			files: ["*.ts", "*.tsx", "*.page.tsx"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				ecmaVersion: 2023,
				sourceType: "module",
			},
			plugins: ["@typescript-eslint"],
			rules: {
				indent: ["error", "tab"],
				"linebreak-style": ["error", "unix"], // Alterada para "unix"
				quotes: ["error", "double"],
				semi: ["error", "always"],
			},
		},
		{
			// Adicione uma exceção para arquivos que usam o Prettier
			files: ["*.ts", "*.tsx", "*.page.tsx", "*.jsx", "*.js"],
			rules: {
				indent: "off", // Desabilita as regras de indentação
				"linebreak-style": "off", // Desabilita as regras de quebra de linha
				semi: "off", // Desabilita as regras de ponto e vírgula
			},
		},
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2023,
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		indent: ["error", "tab"],
		"linebreak-style": ["error", "unix"], // Alterada para "unix"
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"react/react-in-jsx-scope": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"react-hooks/exhaustive-deps": "off",
    
		"react-hooks/rules-of-hooks": "off",
		"@next/next/no-img-element": "off",
		"@typescript-eslint/ban-types": "off",
		"react/display-name": "off",
		"no-mixed-spaces-and-tabs": "off",
		"no-empty": "off",
		// A linha "linebreak-style" foi mantida como "unix"
	},
	settings: {
		react: {
			version: "detect",
		},
	},
};
