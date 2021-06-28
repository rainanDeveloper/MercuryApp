const { compilerOptions } = require('./tsconfig.json')
const { pathsToModuleNameMapper } = require('ts-jest/utils')

module.exports = {
	bail: true,
	clearMocks: true,
	coverageProvider: "v8",
	preset: "ts-jest",
	modulePathIgnorePatterns: [
		"./dist"
	],
	testMatch: [
		"**/__tests__/**/*.test.ts?(x)"
	],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src'})
}