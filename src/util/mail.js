
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const {smtp} = require('../keys')

class Mail {
    sendEmailConfirmation(token) {
        const decoded = jwt.decode(token);
        const transporter = nodemailer.createTransport({
            host: smtp.host,
            port: smtp.port,
            secure: false,
            auth: {
                user: smtp.user,
                pass: smtp.password
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        const host = process.env.DB_HOST || 'fullipscolombia.com';
        var mailOptions = {
            from: smtp.user,
            to:`${decoded.email}`,
            subject: "Confirma tu correo electrónico",
            html: `
            <h1>Hola ${decoded.name}</h1>
            <p>Confirma tu correo electrónico:</p>
            <a href="http://${host}/confirmation-email/${token}">http://${host}/confirmation-email/confirmation</a>`,
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return `${error.message}`;
            } else {
                return "Confirmación enviada";
            }
        });
    }

    setToken(token) {
        this.token = token;
    }

}

module.exports.MailManager = Mail;