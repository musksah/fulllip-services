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
                const { name } = user.customer;
                const token = jwt.sign({ id_user, name, email }, keytoken, { expiresIn: '24h' });
                req.session.id_user = id_user;
                req.session.name = name;
                req.session.email = email;
                req.session.id_rol = id_rol;
                const sessionI = req.sessionID;
                res.json({ token: token, rol: id_rol, name: name, session: sessionI, confirmed: confirmed });
                console.log(token);
            } else {
                res.status(201).send({ message: "Credenciales Inválidas." });
            }
        });

    }
};

module.exports.register = (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, data) => {
        if (err) {
            console.log(err);
            res.status(201).send({ message: "Usuario Existente." });
        } else {
            req.body.password = data;
            try {
                const user = await User.create({ email: req.body.email, password: req.body.password });
                if (user) {
                    const mailManager = new MailManager();
                    const { id_user, email, id_rol } = user;
                    const customer = await Customer.create({ name: req.body.name, lastname: req.body.lastname, id_user: id_user });
                    const { name } = customer;
                    const token = jwt.sign({ id_user, name, email }, keytoken, { expiresIn: '24h' });
                    const response = await mailManager.sendEmailConfirmation(token);
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
