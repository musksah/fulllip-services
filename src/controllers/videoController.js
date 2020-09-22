const { Video } = require('../database');

module.exports.findAll = async (req, res) => {
    const video = await Video.findAll()
    res.json(video);
}

module.exports.create = async (req, res) => {
    const video = req.body;
    const newVideo = await Video.create(video);
    res.json(newVideo);
}