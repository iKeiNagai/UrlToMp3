const youtubedl = require('youtube-dl-exec');

async function convertToMp3(url, outputPath){
    try{
        await youtubedl(url, {
            output: outputPath,
            extractAudio: true,
            audioFormat: 'mp3',
            audioQuality: '0'
        });
    }catch (error) {
        console.error('Error converting video to MP3:', error);
        throw error;
    }
}

module.exports = convertToMp3;