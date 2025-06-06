const youtubedl = require('youtube-dl-exec');

async function getVideoData(url) {
    try{
        const info = await youtubedl(url, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            preferFreeFormats: true,
            noWarnings: true,
        });
        return info;
    }catch (error) {
        console.error('Error fetching metadata:', error);
        throw error;
    }
}

module.exports = getVideoData;