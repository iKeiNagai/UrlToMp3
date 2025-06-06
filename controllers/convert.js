const getVideoData = require('../utils/getVideoData');
const sanitize = require('sanitize-filename');
const path = require('path');
const convertToMp3 = require('../utils/convertToMp3');

 module.exports = async (req, res) => {
    const { url } = req.body;

    // validate url
    if(!url || !url.startsWith('https://www.youtube.com/watch') && !url.startsWith('https://youtu.be/')) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    try{
        const info = await getVideoData(url);
        const title = sanitize(info.title);
        console.log(title);
        
        const outputPath = path.join(__dirname, 'download', `${title}.mp3`);

        await convertToMp3(url, outputPath);
        res.json({title: title});
    }catch (e){
        console.error('Error processing video:', e);
        res.status(500).json({ error: 'Failed to process video' });
    }

}