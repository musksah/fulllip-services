var nodemailer = require('nodemailer');

module.exports.sendMail = async (req, res) => {
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
        // host: 'smtp.ethereal.email',
        // port: 587,
        // auth: {
        //     user: 'melvina30@ethereal.email',
        //     pass: 'rmQtRnuswkyZnPkFuC'
        // }
        
    });

    var mailOptions = {
        from: "info@sebastian-hr.com",
        to: 'xsebastianhrodriguezx@gmail.com',
        subject: "Enviado dese fullips",
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