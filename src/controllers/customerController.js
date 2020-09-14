// const bcrypt = require('bcrypt');
// const { json } = require('sequelize/types');
const { User, Customer } = require('../database');
const { keytoken } = require('../keys');
const { sessionStore } = require('../middlewares/session');
const { sendMail } = require('./contactController');


module.exports.findOne = (req, res) => {
    sessionStore.get(req.body.session, async (error, sessionI) => {
        Customer.hasOne(User, { foreignKey: 'id_user' });
        const customer = await Customer.findOne({ where: { id_user: sessionI.id_user }, include: [User] });

        res.json(customer);
    });
};

module.exports.updateProfile = async (req, res) => {
    const [numberOfAffectedRows, affectedRows] = await Customer.update(req.body, {
        where: { id_customer: req.params.id },
        returning: true
    })
    res.json({ affectedRows });
    console.log(affectedRows);

}
