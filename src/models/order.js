module.exports = (sequelize, type) => {
    const Order = sequelize.define('order', {
        id_order: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        order_code: type.STRING,
        total_products: type.INTEGER,
        total_value: type.INTEGER,
        status_code: type.STRING,
        status: type.STRING,
        id_shipping: {
            type: type.BIGINT,
            references: {
                model: 'shipping',
                key: 'id_shipping'
            }
        },
        id_customer: {
            type: type.BIGINT,
            allowNull: true
        },
        delivered: {
            type: type.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        donation: type.INTEGER
    }, {
        tableName: 'order'
    });
    return Order;
}