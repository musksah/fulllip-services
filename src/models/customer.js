module.exports = (sequelize, type) => {
    const Customer = sequelize.define('customer', {
        id_customer: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        dni_id: type.STRING,
        name: type.STRING,
        lastname: type.STRING,
        address: type.STRING,
        phone: type.STRING,
        birthdate: type.DATE,
        gender: type.DATE,
        contry: type.DATE,
        city: type.DATE,
        id_user: {
            type: type.BIGINT,
            references: {
                model: 'user',
                key: 'id_user'
            }
        },
    }, {
        tableName: 'customer'
    });
    return Customer;
}