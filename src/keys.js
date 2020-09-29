module.exports = {
    database: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'fulllip',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '3306',
        dialect: process.env.DB_DIALECT || 'mysql'
    },
    databaseSession: {
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'fulllip',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '3306',
    },
    keytoken: process.env.KEYTOKEN || 'FULLIPTOKEN2020',
    keysession: process.env.KEYSESSION || 'FULLIPTOKEN2020'
};