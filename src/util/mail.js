
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

class Mail {
    sendEmailConfirmation(token) {
        const decoded = jwt.decode(token);
        const transporter = nodemailer.createTransport({
            host: '45.82.73.11',
            port: '25',
            secure: false,
            auth: {
                user: 'info@sebastian-hr.com',
                pass: 'fullips2020$'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        var mailOptions = {
            from: "info@sebastian-hr.com",
            to:`${decoded.email}`,
            subject: "Enviado dese fullips",
            html: `
            <h1>Hola ${decoded.name}</h1>
            <p>Anderson no sabe programar</p>
            <p>Confirma tu correo electrónico:</p>
            <a href="http://localhost:3000/confirmation-email/${token}">http://localhost:3000/confirmation-email/confirmation</a>`,
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