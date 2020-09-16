const { ImgInProduct } = require('../../database');

module.exports.findAll = async (req, res) => {
    const imageIndex = await ImgInProduct.findAll()
    res.json(imageIndex);
}

module.exports.findOne = async (req, res) => {
    res.json({'Probando':'123'});
}

module.exports.create = async (req, res) => {
    const bdy = req.body;
    const create = ImgInProduct.create(bdy)
    res.json({'response':'La imagen fue insertada con éxito.'});
}

module.exports.update = async (req, res) => {
    res.json({'Probando':'123'});
}

module.exports.delete = async (req, res) => {
    res.json({'Probando':'123'});
}
