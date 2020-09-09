const { Advice } = require('../database');

module.exports.findAll = async (req, res) => {
    const advice = await Advice.findAll()
    res.json(advice);
}

module.exports.create = async (req, res) => {
    const advice = req.body;
    const newAdvice = await Advice.create(advice);
    res.json(newAdvice);
}