
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { smtp } = require('../keys');
const fs = require('fs');

class Mail {

    constructor() {
        this.transporter = nodemailer.createTransport({
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
    }

    sendEmailConfirmation(token) {
        const decoded = jwt.decode(token);
        const host = process.env.DB_HOST || 'fullipscolombia.com';

        let html_template = '';
        fs.readFile(__dirname+'/email/contact.html', (err, data) => {
            if (err) throw err;
            console.log('template: '+data);
        });

        // var mailOptions = {
        //     from: smtp.user,
        //     to: `${decoded.email}`,
        //     subject: "Confirma tu correo electrónico",
        //     html: `
        //     <h1>Hola ${decoded.name}</h1>
        //     <p>Confirma tu correo electrónico:</p>
        //     <a href="http://${host}/confirmation-email/${token}">http://${host}/confirmation-email/confirmation</a>`,
        // }
        // this.transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         return `${error.message}`;
        //     } else {
        //         return "Confirmación enviada";
        //     }
        // });
    }

    sendMailContact(params) {
        var mailOptions = {
            from: smtp.user,
            to: `xsebastianhrodriguezx@gmail.com`,
            subject: "Mensaje de Contacto desde Fullips Colombia",
            html: `
            <h1>Este correo fue generado desde el sitio web de fullips colombia</h1>
            <p>Asunto: ${params.subject}</p>
            <p>Nombre: ${params.name} ${params.lastname}</p>
            <p>Mensaje: ${params.message} </p>
            `
        }
        this.transporter.sendMail(mailOptions, (error, info) => {
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