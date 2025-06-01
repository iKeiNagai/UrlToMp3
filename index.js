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


app.post('/convert', async (req, res) => {
    const { url } = req.body;
    console.log(`Received URL: ${url}`);

    try{
        const info = await getVideoData(url);
        console.log(info.title);
        
        const outputPath = path.join(__dirname, 'download', `${info.title}.mp3`);
        console.log(`Output path: ${outputPath}`);


        res.json({title: info.title});
    }catch (e){
        console.error('Error processing video:', e);
        res.status(500).json({ error: 'Failed to process video' });
    }

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
