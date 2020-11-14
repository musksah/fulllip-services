const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Customer } = require('../database');
const { keytoken } = require('../keys');
const { sessionStore } = require('../middlewares/session');
const { MailManager } = require('../util/mail');


module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    User.hasOne(Customer, { foreignKey: 'id_user' });
    const user = await User.findOne({ where: { email: email }, include: [Customer] });
    if (user == null) {
        res.status(201).send({ message: "Credenciales Inválidas." });
    } else {
        bcrypt.compare(password, user.password, (error, data) => {
            if (data === true) {
                const { id_user, email, id_rol, confirmed } = user;
                const { name, id_customer } = user.customer;
                const token = jwt.sign({ id_user, name, email }, keytoken, { expiresIn: '24h' });
                req.session.id_user = id_user;
                req.session.name = name;
                req.session.email = email;
                req.session.id_rol = id_rol;
                const sessionI = req.sessionID;
                res.json({ token: token, rol: id_rol, name: name, session: sessionI, confirmed: confirmed, idCustomer: id_customer });
                console.log(token);
            } else {
                res.status(201).send({ message: "Credenciales Inválidas." });
            }
        });

    }
};

module.exports.register = (req, res) => {
    const rol = req.body.rol ? 2 : 1;
    bcrypt.hash(req.body.password, 10, async (err, data) => {
        if (err) {
            console.log(err);
            res.status(201).send({ message: "Usuario Existente." });
        } else {
            req.body.password = data;
            try {
                const mailManager = new MailManager();
                let responseWel = true;
                const sendWelcome = await mailManager.sendWelcome(req.body.email).then( welcome =>{
                    responseWel = true;
                }).catch( err =>{
                    responseWel = false;
                });
                if(responseWel == false){
                    res.status(201).json({ message: "Correo no válido" });
                }
                const user = await User.create({ email: req.body.email, password: req.body.password, id_rol: rol });
                if (user) {
                    const { id_user, email, id_rol } = user;
                    const customer = await Customer.create({ name: req.body.name, lastname: req.body.lastname, id_user: id_user });
                    const { name } = customer;
                    const token = jwt.sign({ id_user, name, email }, keytoken, { expiresIn: '24h' });
                    if (parseInt(rol) === 1) {
                        const response = await mailManager.sendEmailConfirmation(token);
                    }
                    req.session.id_user = id_user;
                    req.session.name = name;
                    req.session.email = email;
                    req.session.id_rol = id_rol;
                    const sessionI = req.sessionID;
                    res.json({ token: token, name: name, session: sessionI });
                }
            } catch (error) {
                console.error(error);
                res.status(201).send({ message: "Usuario Existente." });
            }
        }
    }
    );
}

module.exports.confirmation = async (req, res) => {
    const token = req.params.token;
    const decoded = jwt.decode(token);
    const response = await User.update(
        { confirmed: 1 },
        { where: { id_user: decoded.id_user } }
    );
    res.json({ 'response': 'Usuario actulizado' });
}

module.exports.logOut = (req, res) => {
    sessionStore.destroy(req.body.session, (error) => {
        res.json("ok");
    });
}

module.exports.session = (req, res) => {
    const token = req.headers['authorization'].split(" ")[1];
    jwt.verify(token, keytoken, (err, decoded) => {
        if (err) {
            res.status(201).send({ message: "Token no válido." });
            console.log(err);
        } else {
            res.json(decoded);
        }
    });
}

module.exports.updatePassword = async (req, res) => {
    const { passwordA } = req.body;
    const user = await User.findOne({ where: { id_user: req.params.id } });
    bcrypt.compare(passwordA, user.password, (error, data) => {
        if (data === true) {
            bcrypt.hash(req.body.password, 10, async (err, datos) => {
                if (err) {
                    console.log(err);
                    res.status(201).send({ message: "Contraseña Antigua Incorrecta." });
                } else {
                    req.body.password = datos;
                    const [numberOfAffectedRows, affectedRows] = await User.update({ password: req.body.password }, {
                        where: { id_user: req.params.id },
                        returning: true
                    });
                    res.status(200).send({ message: "La contraseña fue actualizada." });
                }
            });
        }
        else {
            res.status(201).send({ message: "Contraseña Antigua Incorrecta." });
        }
    });
}
module.exports.updatePasswordEmail = async (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const [numberOfAffectedRows, affectedRows] = await User.update({ password: data }, {
                where: { email: req.params.id },
                returning: true
            });
            res.status(200).send({ message: "La contraseña fue actualizada." });
        }
    }
    );
}

module.exports.updateEmail = async (req) => {

    const [numberOfAffectedRows, affectedRows] = await User.update({ email: req.body.email }, {
        where: { id_user: req.body.usuario },
        returning: true
    });
    return "El correo fue actualizado.";
}

module.exports.findOne = async (req, res) => {
    const mailManager = new MailManager();
    User.hasOne(Customer, { foreignKey: 'id_user' });
    const user = await User.findOne({ where: { email: req.body.email }, include: [Customer] });
    if (user) {
        const { id_user, email } = user;
        const { name, lastname } = user.customer;
        console.log(id_user);
        console.log(email);
        console.log(name);
        console.log(lastname);
        const token = jwt.sign({ id_user, name, lastname, email }, keytoken, { expiresIn: '1h' });
        console.log(token);
        mailManager.sendChangePassword(token);
        res.json({ message: "El correo fue enviado correctamente" });
    } else {
        res.status(201).send({ message: "Correo Inválido" });
    }
};

module.exports.confirmationEmail = async (req, res) => {
    const token = req.params.token;
    jwt.verify(token, keytoken, (err, decoded) => {
        if (err) {
            res.status(201).send({ message: "Token no válido." });
            console.log(err);
        } else {
            console.log(decoded);
            res.json(decoded.email);
        }
    });
}

module.exports.emails = async (req, res) => {
    const users = await User.findAll({ where: { id_rol: 1 } });
    console.log(users);
    res.json(users);
}
