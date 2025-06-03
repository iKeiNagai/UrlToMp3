require('dotenv').config();
require('./config/db');
const express = require('express');
const youtubedl = require('youtube-dl-exec');
const path = require('path');

const app = express();

app.use(express.static('public'));
app.use(express.json());

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

app.post('/convert', async (req, res) => {
    const { url } = req.body;
    console.log(`Received URL: ${url}`);

    try{
        const info = await getVideoData(url);
        const title = info.title;
        console.log(title);
        
        const outputPath = path.join(__dirname, 'download', `${title}.mp3`);
        console.log(`Output path: ${outputPath}`);

        await convertToMp3(url, outputPath);
        res.json({title: title});
    }catch (e){
        console.error('Error processing video:', e);
        res.status(500).json({ error: 'Failed to process video' });
    }

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
