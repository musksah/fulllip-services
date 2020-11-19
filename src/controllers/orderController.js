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
                'dni_id',
                'country',
                'city',
                'phone',
                [Sequelize.fn('date_format', Sequelize.col('agreed_date'), '%Y-%m-%d %h:%i:%s'), 'agreed_date']
            ]
        }, { model: OrderDetails, include: [Item] }], order: [['id_order', 'DESC']]
    });
    console.log(order);
    res.json(order);
}

module.exports.update = async (req, res) => {
    const update = Order.update(req.body, {
        where: { order_code: req.params.nOrder },
        returning: true
    });
    res.json({ 'response': 'El producto fue actualizado con éxito' });
}