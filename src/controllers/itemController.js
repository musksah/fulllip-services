const { Item } = require('../database');
const { ImageItem } = require('../database');

module.exports.findAll = async (req, res) => {
    const imageIndex = await Item.findAll()
    res.json(imageIndex);
}

module.exports.findOne = async (req, res) => {
    const itemId = req.params.userId;
    Item.hasOne(ImageItem, { foreignKey: 'id_item' });
    const item = await Item.findAll({ where: { id_item: itemId }, include: [ImageItem], limit: 4 });
    res.json(item);
}

module.exports.create = async (req, res) => {
    const bdy = req.body;
    const create = Item.create(bdy)
    res.json({ 'response': 'El producto fue creado con éxito' });
}

module.exports.update = async (req, res) => {
    const update = Item.update(req.body, {
        where: { id_item: req.params.id },
        returning: true
    });
    res.json({ 'response': 'El producto fue actualizado con éxito' });
}

module.exports.delete = async (req, res) => {
    res.json({ 'Probando': '123' });
}
