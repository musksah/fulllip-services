const { Donation } = require('../database');

module.exports.findAll = async (req, res) => {
    const donation = await Donation.findAll()
    res.json(donation);
}