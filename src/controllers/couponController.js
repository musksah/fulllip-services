const { Coupon, Order, Shipping, OrderDetails, Item  } = require('../database');
const Sequelize = require('sequelize');

module.exports.findAll = async (req, res) => {
    const coupons = await Coupon.findAll()
    res.json(coupons);
}

module.exports.findDetailSale = async (req, res) => {
    Order.belongsTo(Shipping, { foreignKey: 'id_shipping' });
    Order.belongsTo(Coupon, { foreignKey: 'id_coupon' });
    OrderDetails.belongsTo(Item, { foreignKey: 'id_item' });
    Order.hasMany(OrderDetails, { foreignKey: 'id_order' });
    const order = await Order.findAll({
        include: 
        [
            {
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
            },
            { 
                model: OrderDetails, include: [Item] 
            },
            { 
                model: Coupon,attributes: ['id_coupon','codename','name','discount_value'] 
            }
        ],
        where: { id_coupon: req.params.id }, 
        order: [['id_order', 'DESC']]
    });
    console.log(order);
    res.json(order);
}

module.exports.create = async (req, res) => {
    const coupon = req.body;
    const newCoupon = await Coupon.create(coupon);
    res.json(newCoupon);
}

module.exports.update = async (req, res) => {
    const update = Coupon.update(req.body, {
        where: { id_coupon: req.params.id },
        returning: true
    });
    res.json({ 'response': 'El cupón fue actualizado con éxito' });
}

module.exports.findOne = async (req, res) => {
    const codeName = req.body.codename;
    const coupon = await Coupon.findOne({ where: { codename: codeName } });
    res.json(coupon);
}

module.exports.destroy = async (req, res) => {
    const response = await Coupon.destroy({
        where: {
            id_coupon: req.params.id
        }
    })
    res.json(response);
}