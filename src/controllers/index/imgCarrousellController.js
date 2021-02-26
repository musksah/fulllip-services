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
    let tday = new Date();
    const STRTODAY = `${tday.getFullYear()}${(tday.getMonth() + 1)}${tday.getDate()}${tday.getHours()}${tday.getMinutes()}${tday.getSeconds()}`;
    let sampleFile;
    let uploadPath;
    let consoleLog = '';
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let typeImage = req.body.typeimages;
    let idImage = req.body.id;
    let fieldUrl = '';
    switch (typeImage) {
        case "Desktop":
            fieldUrl = 'url';
            break;
        case "Tablet":
            fieldUrl = 'url_tablet';
            break;
        case "Mobile":
            fieldUrl = 'url_mobile';
            break;
        default:
            consoleLog += " No se pudo actualizar la imagen ";
            return res.status(400).send(consoleLog);
    }
    sampleFile = req.files.file;
    let nameFile = sampleFile.name.split('.');
    uploadPath = `${keys.pathImages}/${nameFile[0]}${STRTODAY}.jpg`;
    let dataUpdate = { type_image: sampleFile.mimetype};
    dataUpdate[fieldUrl] = `img/index/banner/${nameFile[0]}${STRTODAY}.jpg`;
    
    const update = await ImageCarr.update(dataUpdate, {
        where: { id_image_carrousel: idImage },
        returning: true
    });
    

    // console.log(`${keys.pathImages}/${sampleFile.name}`);
    // console.log(update);
    // console.log(uploadPath);
    // console.log("-> " + idImage + " " + typeImage + " fieldUrl " + fieldUrl);
    //Borra el archivo anterior
    try {
        fs.unlinkSync(`${keys.pathImages}/${sampleFile.name}`)
        consoleLog+='File removed';
    } catch (err) {
        consoleLog+='Something wrong happened removing the file '+err+' ';
        return res.status(500).send(consoleLog);
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

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
        return res.status(500).send('Something wrong happened removing the file ' + err);
    }
}


module.exports.delete = async (req, res) => {
    res.json({ 'Probando': '123' });
}

