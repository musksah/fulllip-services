const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Customer } = require('../database');
const { keytoken } = require('../keys');
const { sessionStore } = require('../middlewares/session');


module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    User.hasOne(Customer, { foreignKey: 'id_user' });
    const user = await User.findOne({ where: { email: email }, include: [Customer] });
    if (user == null) {
        res.status(201).send({ message: "Credenciales Inválidas" });
    } else {
        bcrypt.compare(password, user.password, (error, data) => {
            if (data === true) {

                const { id_user, email, id_rol } = user;
                const { name } = user.customer;
                const token = jwt.sign({ id_user, name, email }, keytoken);
                console.log(id_user);
                console.log(email);
                console.log(id_rol);
                console.log(name);
                req.session.id_user = id_user;
                req.session.name = name;
                req.session.email = email;
                req.session.id_rol = id_rol;
                const sessionI = req.sessionID;
                console.log(req.session)
                res.json({ token: token, rol: id_rol, name: name, session: sessionI });
            } else {
                res.status(201).send({ message: "Credenciales Inválidas" });
            }
        });

    }
};

module.exports.register = (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, data) => {
        if (err) {
            console.log(err);
            res.status(201).send({ message: "Usuario Existente" });
        } else {
            req.body.password = data;
            try {
                const user = await User.create({ email: req.body.email, password: req.body.password });
                if (user) {
                    const { id_user, email, id_rol } = user;
                    const customer = await Customer.create({ name: req.body.name, lastname: req.body.lastname, id_user: id_user });
                    const { name } = customer;
                    const token = jwt.sign({ id_user, name, email }, keytoken);
                    req.session.id_user = id_user;
                    req.session.name = name;
                    req.session.email = email;
                    req.session.id_rol = id_rol;
                    const sessionI = req.sessionID;
                    res.json({ token: token, name: name, session: sessionI });
                }
            } catch (error) {
                console.error(error);
                res.status(201).send({ message: "Usuario Existente" });
            }
        }
    }
    );
}

module.exports.logOut = (req, res) => {
    sessionStore.destroy(req.body.session, (error) => {
        res.json("ok");
    });
}
