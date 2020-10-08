var nodemailer = require('nodemailer');
const {smtp} = require('../keys')


module.exports.sendMail = async (req, res) => {
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

    var mailOptions = {
        from: smtp.user,
        to: 'xsebastianhrodriguezx@gmail.com',
        subject: "Prueba fullips",
        html: `
        <h1>Confirma tu correo</h1>
        <p>Anderson no sabe programar</p>
        <p>Confirma tu correo electrónico:</p>
        <a href="http://localhost/api/confirmation/">Link de confimación</a>
        `,
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.message)
        } else {
            console.log("Email enviado");
            res.status(200).send(req.body)
        }
    });

}