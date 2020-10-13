module.exports = (sequelize, type) => {
    const Shipping = sequelize.define('shipping', {
        id_shipping: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        address: type.STRING,
        extra_address: type.STRING,
        name: type.STRING,
        lastname: type.STRING,
        dni_id: type.STRING,
        country: type.STRING,
        city: type.STRING,
        phone: type.STRING,
        agreed_date : type.DATE,
    }, {
        tableName: 'shipping'
    });
    return Shipping;
}