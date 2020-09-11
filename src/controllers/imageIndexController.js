const { ImageIn } = require('../database');

module.exports.findAll = async (req, res) => {
    const imageIndex = await ImageIn.findAll()
    res.json(imageIndex);
    // res.json({'Hola':'Humanos'});
}

module.exports.findOne = async (req, res) => {
    res.json({'Probando':'123'});
}

module.exports.create = async (req, res) => {
    const bdy = req.body;
    const create = ImageIn.create(bdy)
    res.json(create);
}

module.exports.update = async (req, res) => {
    res.json({'Probando':'123'});
}

module.exports.delete = async (req, res) => {
    res.json({'Probando':'123'});
}

