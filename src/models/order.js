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
        id_shipping: {
            type: type.BIGINT,
            references: {
                model: 'shipping',
                key: 'id_shipping'
            }
        },
        id_customer: {
            type: type.BIGINT,
            references: {
                model: 'customer',
                key: 'id_customer'
            }
        }
    }, {
        tableName: 'order'
    });
    return Order;
}