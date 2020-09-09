module.exports = (sequelize, type) => {
    const PayM = sequelize.define('pay_method', {
        id_pay_method: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        type: type.STRING,
        name: type.STRING,
        description: type.TEXT,
        card_number: type.STRING,
        account: type.STRING,
        expiration_date: type.DATE
    }, {
        tableName: 'pay_method'
    });
    return PayM;
}