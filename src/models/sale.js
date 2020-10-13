module.exports = (sequelize, type) => {
    const Sale = sequelize.define('sale', {
        id_sale: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        transaction_date: type.DATE,
        state: type.STRING,
        id_pay_method: {
            type: type.BIGINT,
            references: {
                model: 'pay_method',
                key: 'id_pay_method'
            }
        },
        id_order: {
            type: type.BIGINT,
            references: {
                model: 'order',
                key: 'id_order'
            }
        }
    }, {
        tableName: 'sale'
    });
    return Sale;
}