
var nodemailer = require('nodemailer');
var keys = require('../keys');
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
        fs.readFile(__dirname + '/email/contact.html', (err, data) => {
            if (err) throw err;
            console.log('template: ' + data);

            var mailOptions = {
                from: smtp.user,
                to: `${decoded.email}`,
                subject: "Confirma tu correo electrónico",
                html: `
                <h1>Hola ${decoded.name}</h1>
                <p>Confirma tu correo electrónico:</p>
                <a href="${keys.hostapi}/confirmation-email/${token}">${keys.hostapi}/confirmation-email/confirmation</a>`,
            }
            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return `${error.message}`;
                } else {
                    return "Confirmación enviada";
                }
            });
        });
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

    sendMailChange(params) {
        console.log(params);
        var mailOptions = {
            from: smtp.user,
            to: params.email,
            subject: '',
            html: ''
        }
        return Promise.resolve(this.transporter.sendMail(mailOptions).then(() => {
            return "ok";
        }).catch(() => {
            return "error";
        }));
    }

    sendTest(url, nombre) {
        fs.readFile(__dirname + '/email/changepassword.html', (err, template) => {
            if (err) throw err;
            let strTemplate = template.toString();
            strTemplate = strTemplate.replace("$[NOMBRE]",nombre);
            strTemplate = strTemplate.replace(/URLCONFIRMATION/g,url);
            console.log('template:  ' + strTemplate);
            let mailOptions = {
                from: smtp.user,
                to: 'xsebastianhrodriguezx@gmail.com',
                subject: 'Confirmar Correo Electrónico',
                html: strTemplate
            }
            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return `${error.message}`;
                } else {
                    return "Confirmación enviada";
                }
            });
            // var mailOptions = {
            //     from: smtp.user,
            //     to: `${decoded.email}`,
            //     subject: "Confirma tu correo electrónico",
            //     html: `
            //     <h1>Hola ${decoded.name}</h1>
            //     <p>Confirma tu correo electrónico:</p>
            //     <a href="${keys.hostapi}/confirmation-email/${token}">${keys.hostapi}/confirmation-email/confirmation</a>`,
            // }
            // this.transporter.sendMail(mailOptions, (error, info) => {
            //     if (error) {
            //         return `${error.message}`;
            //     } else {
            //         return "Confirmación enviada";
            //     }
            // });
        });
    }

    sendChangePassword(token) {
        const decoded = jwt.decode(token);
        const host = process.env.DB_HOST || 'fullipscolombia.com';

        var mailOptions = {
            from: smtp.user,
            to: `${decoded.email}`,
            subject: "Completa tu solicitud de restablecimiento de contraseña",
            html: `
                <h1>Hola ${decoded.name} ${decoded.lastname}</h1>
                <p>Para restablecer tu contraseña debes acceder al siguiente enlace.</p>
                <a href="${keys.hostapi}/change-Password/${token}">${keys.hostapi}/change-Password</a>`,
        }
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return `${error.message}`;
            } else {
                return "Confirmación enviada";
            }
        });
    }

}

module.exports.MailManager = Mail;