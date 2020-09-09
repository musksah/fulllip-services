module.exports = (sequelize, type) => {
    const Qa = sequelize.define('qa', {
        id_qa: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        description: type.TEXT
    }, {
        tableName: 'qa'
    });
    return Qa;
}