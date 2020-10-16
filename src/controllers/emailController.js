var nodemailer = require('nodemailer');
const { smtp } = require('../keys')
const { MailManager } = require('../util/mail');


module.exports.sendMailContact = async (req, res) => {
    let params = req.body;
    const mailManager = new MailManager();
    let response = await mailManager.sendMailContact(params);
    res.json({ 'response': 'Email enviado correctamente '});
}