const { Settings } = require('../database');

module.exports.findOne = async (req, res) => {
    const settings = await Settings.findOne({ where: { name: 'confirm_auth' }});
    res.json(settings);
}

module.exports.update = async (req, res) => {
    const advice = req.body;
    const update = Settings.update(req.body, {
        where: { name: 'confirm_auth' },
        returning: true
    });
    res.json({ 'response': 'La opción fue actualizada con éxito' });
    // const settings = await Settings.create(advice);
    // res.json(settings);
    // res.json(advice);
}