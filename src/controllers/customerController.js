// const bcrypt = require('bcrypt');
// const { json } = require('sequelize/types');
const { User, Customer } = require('../database');
const { keytoken } = require('../keys');
const { sessionStore } = require('../middlewares/session');
const { sendMail } = require('./contactController');


module.exports.findOne = (req, res) => {
    sessionStore.get(req.body.session, async (error, sessionI) => {
        Customer.hasOne(User, { foreignKey: 'id_user' });
        const customer = await Customer.findOne({ where: { id_user: sessionI.user_id }, include: [User] });

        res.json(customer);
    });
};

module.exports.updateProfile = (req, res) => {

}
