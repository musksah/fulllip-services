module.exports = (sequelize, type) => {
    const Item = sequelize.define('item', {
        id_item: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        description: type.TEXT,
        weight: type.STRING,
        quantity: type.INTEGER
    }, {
        tableName: 'item'
    });
    return Item;
}