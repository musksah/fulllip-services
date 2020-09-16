module.exports = (sequelize, type) => {
    const ImgInProduct = sequelize.define('img_index_product', {
        id_image_index_product: {
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
        img_parent_id: type.BIGINT,
    }, {
        tableName: 'img_index_product'
    });
    return ImgInProduct;
}