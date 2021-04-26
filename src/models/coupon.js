module.exports = (sequelize, type) => {
    const Coupon = sequelize.define('coupon', {
        id_coupon: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        discount_value: type.BIGINT,
        codename: type.STRING,
        description: type.TEXT,
        expiration_date: type.DATE,
        user_id: type.BIGINT,
        is_active: {
            type: type.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    }, {
        tableName: 'coupon'
    });
    return Coupon;
}
