module.exports = {
    database: {
        username: process.env.DB_USER || 'admin_fullips',
        password: process.env.DB_PASSWORD || 'fullips2020$',
        database: process.env.DB_DATABASE || 'admin_fullips',
        host: process.env.DB_HOST || '45.90.108.19',
        port: process.env.DB_PORT || '3306',
        dialect: process.env.DB_DIALECT || 'mysql'
    },
    databaseSession: {
        user: process.env.DB_USER || 'admin_fullips',
        password: process.env.DB_PASSWORD || 'fullips2020$',
        database: process.env.DB_DATABASE || 'admin_fullips',
        host: process.env.DB_HOST || '45.90.108.19',
        port: process.env.DB_PORT || '3306',
    },
    keytoken: process.env.KEYTOKEN || 'FULLIPTOKEN2020',
    keysession: process.env.KEYSESSION || 'FULLIPTOKEN2020',
    hostapi:'https://sebastian-hr.com/api',
    // hostapi:'localhost:8005',
    hostweb:'https://fullipscolombia.com',
    // hostweb:'127.0.0.1:3000',
    smtp:{
        host:'smtp.flockmail.com',
        port: '587',
        user:'info@fullipscolombia.com',
        password: 'Lalitos321'
    }
};