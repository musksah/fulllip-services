module.exports = (sequelize, type) => {
    const ImageIn = sequelize.define('image_carrousel', {
        id_image_carrousel: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        title: type.STRING,
        subtitle: type.STRING,
        url: type.STRING,
        url_mobile: type.STRING,
        url_tablet: type.STRING,
        type_image: type.STRING,
        size: type.STRING,
        weight: type.STRING,
    }, {
        tableName: 'image_carrousel'
    });
    return ImageIn;
}