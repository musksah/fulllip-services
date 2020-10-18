var nodemailer = require('nodemailer');
const { smtp } = require('../keys')
const { MailManager } = require('../util/mail');
const { updateEmail } = require('../controllers/userController');

module.exports.sendMailContact = async (req, res) => {
    let params = req.body;
    const mailManager = new MailManager();
    let response = await mailManager.sendMailContact(params);
    res.json({ 'response': 'Email enviado correctamente ' });
}

module.exports.sendMailChange = async (req, res) => {
    let params = req.body;
    const mailManager = new MailManager();
    let response = await mailManager.sendMailChange(params)
    if (response !== "ok") {
        res.status(201).json({ message: "Correo Inválido." });
    } else {
        let response_update = await updateEmail(req);
        res.json({ message: response_update });
    }


}