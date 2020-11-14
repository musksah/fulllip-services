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

module.exports.sendEmailConfirmation = async (req, res) => {
    let params = req.params;
    let token = params.token;
    res.status(200).json({ message: token });
    const mailManager = new MailManager();
    let response = await mailManager.sendEmailConfirmation(token).then(data =>{
        res.status(200).json({ message: "Hemos envíado el correo de confirmación a tu correo" });
    }).catch(err =>{
        res.status(201).json({ message: "El correo no pudo ser enviado por favor comunícate con nosotros para ayudarte" });
    });
}

module.exports.sendTest = async (req, res) => {
    let params = req.body;
    const mailManager = new MailManager();
    let response = await mailManager.sendTest("https://fullipscolombia.com/","Camila");
    if (response) {
        res.status(200).json({ message: response });
    } else {
        res.json({ message: response });
    }
}