const path = require('path');
const deleteFile = require('../utils/deleteMp3');

module.exports =  (req, res) => {
    const filename = req.params.filename;

    const filePath = path.join(__dirname, 'download', filename);
    res.download(filePath, (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(500).send('Error downloading file');
        }
    
        deleteFile(filePath);
    });
}