module.exports = (sequelize, type) => {
    const Advice = sequelize.define('advice', {
        id_advice: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        description: type.TEXT
    }, {
        tableName: 'advice'
    });
    return Advice;
}