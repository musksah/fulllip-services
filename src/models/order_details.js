module.exports = (sequelize, type) => {
    const OrderDetails = sequelize.define('order_details', {
        id_order_details: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: type.INTEGER,
        value: type.INTEGER,
        id_order: {
            type: type.BIGINT,
            references: {
                model: 'order',
                key: 'id_order'
            }
        },
        id_item: {
            type: type.BIGINT,
            references: {
                model: 'item',
                key: 'id_item'
            }
        }
    }, {
        tableName: 'order_details'
    });
    return OrderDetails;
}