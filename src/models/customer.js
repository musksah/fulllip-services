module.exports = (sequelize, type) => {
    const Customer = sequelize.define('customer', {
        id_customer: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        dni_id: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        name: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        lastname: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        address: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        phone: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        birthdate: {
            type: type.DATE,
        },
        gender:
        {
            type: type.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        country: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        city: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
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