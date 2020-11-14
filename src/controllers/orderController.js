const { Order, Shipping, OrderDetails, Item } = require('../database');
const Sequelize = require('sequelize');

module.exports.findAll = async (req, res) => {
    Order.belongsTo(Shipping, { foreignKey: 'id_shipping' });
    OrderDetails.belongsTo(Item, { foreignKey: 'id_item' });
    Order.hasMany(OrderDetails, { foreignKey: 'id_order' });
    const order = await Order.findAll({
        include: [{
            model: Shipping, attributes: [
                'name',
                'lastname',
                'address',
                'extra_address',
                [Sequelize.fn('date_format', Sequelize.col('agreed_date'), '%Y-%m-%d %h:%i:%s'), 'agreed_date']
            ]
        }, { model: OrderDetails, include: [Item] }], order: [['id_order', 'DESC']]
    });
    console.log(order);
    res.json(order);
}