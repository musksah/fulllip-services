const { Qa } = require('../database');

module.exports.findAll = async (req, res) => {
    const qa = await Qa.findAll()
    res.json(qa);
}

module.exports.create = async (req, res) => {
    const qa = req.body;
    const newQa = await Qa.create(qa);
    res.json(newQa);
}