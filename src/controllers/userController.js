const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../database');
const { keytoken } = require('../keys');

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user == null) {
        res.status(201).send({ message: "El usuario no existe" });
    } else {
        bcrypt.compare(password, user.password, (error, data) => {
            if (data === true) {
                const { id_user, name, email } = user;
                req.session.id_user = id_user;
                req.session.name = name;
                req.session.email = email;

                const token = jwt.sign({ id_user, name, email }, keytoken);
                res.json(token);
            } else {
                res.status(202).send({ message: "Contraseña incorrecta" });
            }
        });

    }
};

module.exports.register = (req, res) => {
    const userRegister = req.body;
    bcrypt.hash(userRegister.password, 10, async (err, data) => {
        if (err) {
            console.log(err);
            res.json("no se puedo encriptar la contraseña");
        } else {
            userRegister.password = data;
            try {
                const user = await User.create(userRegister);
                const { id_user, name, email } = user;
                const token = jwt.sign({ id_user, name, email }, keytoken);
                res.json(token);
            } catch (error) {

                console.error(error);
                res.json("No se pudo insertar");
            }


        }
    });
}

module.exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (!err) {
            res.json("Cerró la sesión");
        }
    });
}