module.exports = (sequelize, type) => {
    const ImageIt = sequelize.define('image_item', {
        id_image_item: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        url: type.STRING,
        type_image: type.STRING,
        size: type.STRING,
        priority_field: type.INTEGER,
        weight: type.STRING,
        id_item: {
            type: type.BIGINT,
            references: {
                model: 'item',
                key: 'id_item'
            }
        }
    }, {
        tableName: 'image_item'
    });
    return ImageIt;
}