require('dotenv').config();
require('./config/db');

const express = require('express');
const youtubedl = require('youtube-dl-exec');
const path = require('path');
const sanitize = require('sanitize-filename');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

const Song = require('./models/songs');
const { type } = require('os');

const app = express();

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 requests per windowMs
    message: 'Slow down! Too many requests'
});

app.use(express.static('public'));
app.use(express.json());
app.use(limiter);

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

// convert to mp3 endpoint
app.post('/convert', async (req, res) => {
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

})

//save song endpoint
app.post('/save-song', async (req,res) => {
    const { url } = req.body;
    
    try{
        const info = await getVideoData(url);
        const videoId = info.id;
        const title = sanitize(info.title);
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
        console.error('Error saving song:', e);
        res.status(500).json({ error: 'Failed to save song' });
    }
})

// download endpoint
app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;

    const filePath = path.join(__dirname, 'download', filename);
    res.download(filePath, (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(500).send('Error downloading file');
        }
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
