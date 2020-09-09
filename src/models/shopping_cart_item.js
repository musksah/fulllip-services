module.exports = (sequelize, type) => {
    const ShoppingCI = sequelize.define('shopping_cart_item', {
        id_shopping_cart_item: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: type.INTEGER,
        id_shopping_cart: {
            type: type.BIGINT,
            references: {
                model: 'shopping_cart',
                key: 'id_shopping_cart'
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
        tableName: 'shopping_cart_item'
    });
    return ShoppingCI;
}