import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo test.env
dotenv.config({ path: '.env.test' });

export default {
	"moduleFileExtensions": [
		"js",
		"json",
		"ts"
	],
	"rootDir": "test",
	"testRegex": ".*\\.spec\\.ts$",
	"transform": {
		"^.+\\.(t|j)s$": "ts-jest"
	},
	"collectCoverageFrom": [
		"**/*.(t|j)s"
	],
	"coverageDirectory": "../coverage",
	"testEnvironment": "node"
}
