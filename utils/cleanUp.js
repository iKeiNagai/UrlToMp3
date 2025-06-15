const fs = require('fs');
const path = require('path');
const deleteFile = require('./deleteMp3');

//delete all files in folder whose last
//modified time is more than 15 mins

function cleanUp(downloadDir){
    const maxFileAgeMs = 15 * 60 * 1000; // 15 mins

    //reads directory
    fs.readdir(downloadDir, (err, files) => {
        if(err) return console.error('Error reading folder:', err);

        const now = Date.now();

        files.forEach(file => {
            const filePath = path.join(downloadDir, file);

            console.log(filePath);

            //get file stats (last-modified timestamp)
            fs.stat(filePath, (err, stats) => {
                if(err) return console.error('Error file stats: ', err);

                const age = now - stats.mtimeMs; 

                if(age > maxFileAgeMs){
                    deleteFile(filePath);
                }
            })
        })
    })
}

module.exports = cleanUp;