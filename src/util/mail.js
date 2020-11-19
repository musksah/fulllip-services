
var nodemailer = require('nodemailer');
var keys = require('../keys');
const jwt = require('jsonwebtoken');
const { smtp } = require('../keys');
const fs = require('fs');
const ejs = require('ejs');
const path = require("path");

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

    sendEmailConfirmation = async (token) => {
        const decoded = jwt.decode(token);
        let url = `${keys.hostweb}/confirmation-email/${token}`;
        let emailTemplate = '';
        let rendertemplate = await ejs.renderFile(path.join(__dirname, '/email/emailconfirmation.ejs'), {
            user_firstname: decoded.name,
            confirm_link: url
        }).then(result => {
            emailTemplate = result;
        }).catch(err => {
            console.log("Error: " + err);
            return `${err}`
        });
        let mailOptions = {
            from: `Fullips Colombia <${smtp.user}>`,
            // to: `test-svahv9zuu@srv1.mail-tester.com`,
            to: `${decoded.email}`,
            subject: 'Confirma tu correo electrónico',
            html: emailTemplate
        }
        return this.transporter.sendMail(mailOptions);
    }

    sendWelcome = async (email) => {
        let emailTemplate = '';
        let readtemplate = await ejs.renderFile(path.join(__dirname, '/email/welcome.ejs'), {}).then(result => {
            console.log('proabdo');
            emailTemplate = result;
        }).catch(err => {
            console.log("Error: " + err);
            return false;
        });
        let mailOptions = {
            from: `Fullips Colombia <${smtp.user}>`,
            to: email,
            // to: `test-svahv9zuu@srv1.mail-tester.com`,
            subject: 'Te damos la bienvenido a Fullips Colombia',
            html: emailTemplate
        }
        return this.transporter.sendMail(mailOptions);
    }

    sendMailContact(params) {
        let nombre = params.name;
        let lastname = params.lastname;
        let email = params.email;
        let subject = params.subject;
        let message = params.message;

        fs.readFile(__dirname + '/email/contact.html', (err, template) => {
            if (err) throw err;
            let strTemplate = template.toString();
            strTemplate = strTemplate.replace("VNOMBRES", nombre);
            strTemplate = strTemplate.replace("VAPEELIDOS", lastname);
            strTemplate = strTemplate.replace("VASUNTO", subject);
            strTemplate = strTemplate.replace("VCORREO", email);
            strTemplate = strTemplate.replace("VMENSAJE", message);
            console.log('template:  ' + strTemplate);
            console.log('template:  ' + strTemplate);
            let mailOptions = {
                from: `Fullips Colombia <${smtp.user}>`,
                // to: 'fullipscolombia@gmail.com',
                to: 'xsebastianhrodriguezx@gmail.com',
                subject: 'Mensaje desde la Web Fullips Colombia',
                html: strTemplate
            }
            this.transporter.sendMail(mailOptions).then(() => {
                return true;
            }).catch(() => {
                return false;
            });
        });
    }

    sendMailSale() {
        let nombre = params.name;
        let lastname = params.lastname;
        let email = params.email;
        let subject = params.subject;
        let message = params.message;

        fs.readFile(__dirname + '/email/saleconfirmed.html', (err, template) => {
            if (err) throw err;
            let strTemplate = template.toString();
            strTemplate = strTemplate.replace("VNOMBRES", nombre);
            strTemplate = strTemplate.replace("VAPEELIDOS", lastname);
            strTemplate = strTemplate.replace("VASUNTO", subject);
            strTemplate = strTemplate.replace("VCORREO", email);
            strTemplate = strTemplate.replace("VMENSAJE", message);
            console.log('template:  ' + strTemplate);
            console.log('template:  ' + strTemplate);
            let mailOptions = {
                from: `Fullips Colombia <${smtp.user}>`,
                // to: 'fullipscolombia@gmail.com',
                to: 'xsebastianhrodriguezx@gmail.com',
                subject: 'Venta confirmada',
                html: strTemplate
            }
            this.transporter.sendMail(mailOptions).then((data) => {
                console.log("Enviando correo de ventas");
                console.log(data);
                return true;
            }).catch(() => {
                console.log("Enviando correo de ventas, error");
                return false;
            });
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
            strTemplate = strTemplate.replace("$[NOMBRE]", nombre);
            strTemplate = strTemplate.replace(/URLCONFIRMATION/g, url);
            console.log('template:  ' + strTemplate);
            let mailOptions = {
                from: `Fullips Colombia <${smtp.user}>`,
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
        });
    }

    sendChangePassword = async (token) => {
        const decoded = jwt.decode(token);
        let url = `${keys.hostweb}/change-Password/${token}`;
        let emailTemplate = '';
        let rendertemplate = await ejs.renderFile(path.join(__dirname, '/email/change_password.ejs'), {
            change_link: url
        }).then(result => {
            emailTemplate = result;
        }).catch(err => {
            console.log("Error: " + err);
            return `${err}`
        });
        let mailOptions = {
            from: `Fullips Colombia <${smtp.user}>`,
            to: `${decoded.email}`,
            subject: 'Cambio de contraseña',
            html: emailTemplate
        }
        return this.transporter.sendMail(mailOptions);
        // var mailOptions = {
        //     from: smtp.user,
        //     to: `${decoded.email}`,
        //     subject: "Completa tu solicitud de restablecimiento de contraseña",
        //     html: `
        //         <h1>Hola ${decoded.name} ${decoded.lastname}</h1>
        //         <p>Para restablecer tu contraseña debes acceder al siguiente enlace.</p>
        //         <a href="${keys.hostapi}/change-Password/${token}">${keys.hostapi}/change-Password</a>`,
        // }
        // this.transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         return `${error.message}`;
        //     } else {
        //         return "Confirmación enviada";
        //     }
        // });
    }

}

module.exports.MailManager = Mail;