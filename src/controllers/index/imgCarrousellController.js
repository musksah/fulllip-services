const { ImageCarr } = require('../../database');

module.exports.findAll = async (req, res) => {
    const imageIndex = await ImageCarr.findAll()
    res.json(imageIndex);
}

module.exports.findOne = async (req, res) => {
    res.json({'Probando':'123'});
}

module.exports.create = async (req, res) => {
    const bdy = req.body;
    const create = ImageCarr.create(bdy)
    res.json(create);
}

module.exports.update = async (req, res) => {
    res.json({'Probando':'123'});
}

module.exports.updateFile = async (req, res) => {
    const files = req.files;
    console.log(files)
    res.json({'response':'consumiendo la actualización de archivos.'});
}

module.exports.delete = async (req, res) => {
    res.json({'Probando':'123'});
}

