require('dotenv').config({
    path: ".env"
})

module.exports = {
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT||3306,
	dialect: process.env.DB_DIALECT || 'sqlite',
	storage: process.env.DB_STORAGE_FILE || 'src/db/database'
}
