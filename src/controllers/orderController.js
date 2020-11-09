const { Order, Shipping, OrderDetails, Item } = require('../database');

module.exports.findAll = async (req, res) => {
    Order.belongsTo(Shipping, { foreignKey: 'id_shipping' });
    OrderDetails.belongsTo(Item, { foreignKey: 'id_item' });
    Order.hasMany(OrderDetails, { foreignKey: 'id_order' });
    const order = await Order.findAll({ include: [{ model: Shipping }, { model: OrderDetails, include: [Item] }] });
    res.json(order);
}