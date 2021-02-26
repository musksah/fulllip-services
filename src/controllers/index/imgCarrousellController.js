const { ImageCarr } = require('../../database');
const keys = require('../../keys');
const fs = require('fs')

const PATHFILES = `${keys.pathImages}/img/index/banner`;

module.exports.findAll = async (req, res) => {
    const imageIndex = await ImageCarr.findAll()
    res.json(imageIndex);
}

module.exports.findOne = async (req, res) => {
    res.json({ 'Probando': '123' });
}

module.exports.create = async (req, res) => {
    const bdy = req.body;
    const create = ImageCarr.create(bdy)
    res.json(create);
}

module.exports.update = async (req, res) => {
    res.json({ 'Probando': '123' });
}

module.exports.updateFile = async (req, res) => {
    let sampleFile;
    let uploadPath;
    let consoleLog = '';
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    sampleFile = req.files.file;
    //Borra el archivo anterior
    try {
        fs.unlinkSync(`${keys.pathImages}/${sampleFile.name}`)
        consoleLog+='File removed';
    } catch (err) {
        consoleLog+='Something wrong happened removing the file '+err+' ';
        return res.status(500).send(consoleLog);
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    uploadPath = `${keys.pathImages}/${sampleFile.name}`;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        consoleLog+=' File uploaded! '+uploadPath;
        res.json(consoleLog);
    });
}

module.exports.deleteFile = async (req, res) => {
    let sampleFile = req.body;
    try {
        fs.unlinkSync(`${keys.pathImages}/${sampleFile.name}`)
        return res.status(200).send('File removed!');
    } catch (err) {
        console.error('Something wrong happened removing the file', err)
        return res.status(500).send('Something wrong happened removing the file '+err);
    }
}


module.exports.delete = async (req, res) => {
    res.json({ 'Probando': '123' });
}

