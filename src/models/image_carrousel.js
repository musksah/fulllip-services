module.exports = (sequelize, type) => {
    const ImageIn = sequelize.define('image_carrousel', {
        id_image_index: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        title: type.STRING,
        subtitle: type.STRING,
        url: type.STRING,
        type_image: type.STRING,
        size: type.STRING,
        weight: type.STRING,
    }, {
        tableName: 'image_carrousel'
    });
    return ImageIn;
}