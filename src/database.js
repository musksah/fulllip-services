const Sequelize = require('sequelize');
const adviceModel = require('./models/advice');
const customerModel = require('./models/customer');
const imageInModel = require('./models/image_index');
const imageItModel = require('./models/image_item');
const itemModel = require('./models/item');
const payMModel = require('./models/pay_method');
const permissionModel = require('./models/permission');
const qaModel = require('./models/qa');
const rolModel = require('./models/rol');
const saleModel = require('./models/sale');
const shoppingCModel = require('./models/shopping_cart');
const shoppingCIModel = require('./models/shopping_cart_item');
const userModel = require('./models/user');
const userPModel = require('./models/user_permission');
const { database } = require('./keys');

const sequelize = new Sequelize(database);

const User = userModel(sequelize, Sequelize);
const Rol = rolModel(sequelize, Sequelize);
const Advice = adviceModel(sequelize, Sequelize);
const Customer = customerModel(sequelize, Sequelize);
const ImageIn = imageInModel(sequelize, Sequelize);
const ImageIt = imageItModel(sequelize, Sequelize);
const Item = itemModel(sequelize, Sequelize);
const PayM = payMModel(sequelize, Sequelize);
const Permission = permissionModel(sequelize, Sequelize);
const Qa = qaModel(sequelize, Sequelize);
const Sale = saleModel(sequelize, Sequelize);
const ShoppingC = shoppingCModel(sequelize, Sequelize);
const ShoppingCI = shoppingCIModel(sequelize, Sequelize);
const UserP = userPModel(sequelize, Sequelize);

sequelize.sync().then(() => {
    console.log("tablas creadas");
});

module.exports = {
    User,
    Rol,
    Advice,
    Customer,
    ImageIn,
    ImageIt,
    Item,
    PayM,
    Permission,
    Qa,
    Sale,
    ShoppingC,
    ShoppingCI,
    UserP
}
