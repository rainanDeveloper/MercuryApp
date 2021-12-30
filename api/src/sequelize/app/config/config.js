require('dotenv').config({
    path: '.env'
});

module.exports = {
    username: process.env.DB_USER || '',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'mercuryApp',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT||3306,
    dialect: process.env.DB_DIALECT || 'mysql',
    storage: process.env.DB_STORAGE_FILE,
    migrationStorageTableName: 'sequelize_meta',
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_data',
    dialectOptions: {
        dateStrings: true,
        typeCast: true
    },
    operatorAliases: false,
    logging: process.env.DB_LOGGING||false,
    define:{
        timestamps: true,
        undescored: true,
        undescoredAll: true
    }
};
