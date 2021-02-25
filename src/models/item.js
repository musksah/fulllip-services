module.exports = (sequelize, type) => {
    const Item = sequelize.define('item', {
        id_item: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        subtitle: type.STRING,
        description: type.TEXT,
        weight: type.STRING,
        price: type.INTEGER,
        stock: type.INTEGER,
        discounted_price: {
            type: type.INTEGER,
            defaultValue: 0
        },
        is_discounted: {
            type: type.INTEGER,
            defaultValue: 0
        }
    }, {
        tableName: 'item'
    });
    return Item;
}