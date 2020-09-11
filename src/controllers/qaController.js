const { Qa } = require('../database');

module.exports.findAll = async (req, res) => {
    const qa = await Qa.findAll()
    res.json(qa);
}

// module.exports.update = async (req, res) => {
//     const qa = req.body;
//     const newQa = await Qa.create(qa);
//     res.json(newQa);
// }

// module.exports.delete = async (req, res) => {
//     const qa = req.body;
//     const newQa = await Qa.create(qa);
//     res.json(newQa);
// }

// module.exports.findOne = async (req, res) => {
//     const qa = req.body;
//     const newQa = await Qa.create(qa);
//     res.json(newQa);
// }

module.exports.create = async (req, res) => {
    const qa = req.body;
    const newQa = await Qa.create(qa);
    res.json(newQa);
}