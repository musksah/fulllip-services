module.exports = (sequelize, type) => {
    const ShoppingC = sequelize.define('shopping_cart', {
        id_shopping_cart: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        total_products: type.INTEGER,
        total_value: type.INTEGER,
        email: type.STRING,
        id_customer: {
            type: type.BIGINT,
            references: {
                model: 'customer',
                key: 'id_customer'
            }
        }
    }, {
        tableName: 'shopping_cart'
    });
    return ShoppingC;
}