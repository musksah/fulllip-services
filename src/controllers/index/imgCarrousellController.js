const { ImageCarr } = require('../../database');
const keys = require('../../keys');

const PATHFILES = `${keys.pathImages}\\imgpruebas`;

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
    console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.file;
    // uploadPath = 'C:\\Users\\57302\\Documents\\Proyects\\imgpruebas' + sampleFile.name;
    uploadPath = `${PATHFILES}\\${sampleFile.name}`;
    
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
        if (err){
            console.log(err);
            return res.status(500).send(err);
        }
        res.json('File uploaded!');
    });
}

module.exports.delete = async (req, res) => {
    res.json({ 'Probando': '123' });
}

