module.exports = (sequelize, type) => {
    const ImageIn = sequelize.define('image_index', {
        id_image_index: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        url: type.STRING,
        type_image: type.STRING,
        size: type.STRING,
        weight: type.STRING,
        section: type.STRING
    }, {
        tableName: 'image_index'
    });
    return ImageIn;
}