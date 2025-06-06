const getVideoData = require('../utils/getVideoData');
const deleteFile = require('../utils/deleteMp3');
const path = require('path');
const Song = require('../models/songs');

module.exports = async (req,res) => {
    const { url, title } = req.body;
    
    try{
        const info = await getVideoData(url);
        const videoId = info.id;
        const duration = info.duration;

        //save song to db
        const song = new Song({
            videoId: videoId,
            title: title,
            duration: duration
        });

        await song.save();
        console.log(`Song saved: ${title}`);
        res.json({
            downloadurl : `/download/${title}.mp3`,
        })
    } catch (e){

        //duplicate key error
        if (e.code === 11000) {
            deleteFile(path.join(__dirname, 'download', `${title}.mp3`));
            return res.status(409).json({ error: 'Duplicate song entry' });
        }

        console.error('Error saving song:', e);
        res.status(500).json({ error: 'Failed to save song' });
    }
}