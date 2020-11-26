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
const shippingModel = require('./models/shipping');
const orderModel = require('./models/order');
const orderDetailsModel = require('./models/order_details');
const userModel = require('./models/user');
const userPModel = require('./models/user_permission');
const imageCarrModel = require('./models/image_carrousel');
const imgInProdModel = require('./models/img_index_product');
const videoModel = require('./models/video');
const confirmationResponseModel = require('./models/confirmationResponse');
const donationModel = require('./models/donation');
const { database } = require('./keys');

const sequelize = new Sequelize(database);

const User = userModel(sequelize, Sequelize);
const Rol = rolModel(sequelize, Sequelize);
const Advice = adviceModel(sequelize, Sequelize);
const Customer = customerModel(sequelize, Sequelize);
const ImageIn = imageInModel(sequelize, Sequelize);
const ImageItem = imageItModel(sequelize, Sequelize);
const Item = itemModel(sequelize, Sequelize);
const PayM = payMModel(sequelize, Sequelize);
const Permission = permissionModel(sequelize, Sequelize);
const Qa = qaModel(sequelize, Sequelize);
const Shipping = shippingModel(sequelize, Sequelize);
const Sale = saleModel(sequelize, Sequelize);
const Order = orderModel(sequelize, Sequelize);
const OrderDetails = orderDetailsModel(sequelize, Sequelize);
const UserP = userPModel(sequelize, Sequelize);
const ImageCarr = imageCarrModel(sequelize, Sequelize);
const ImgInProduct = imgInProdModel(sequelize, Sequelize);
const Video = videoModel(sequelize, Sequelize);
const ConfirmationResponse = confirmationResponseModel(sequelize, Sequelize)
const Donation = donationModel(sequelize, Sequelize);

sequelize.sync().then(() => {
    console.log("tablas creadas");
});

module.exports = {
    User,
    Rol,
    Advice,
    Customer,
    ImageIn,
    ImageItem,
    Item,
    PayM,
    Permission,
    Qa,
    Sale,
    Shipping,
    Order,
    OrderDetails,
    UserP,
    ImageCarr,
    ImgInProduct,
    Video,
    ConfirmationResponse,
    Donation
}
