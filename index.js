const express = require('express');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post('/convert', (req, res) => {
    const { url } = req.body;
    console.log(`Received URL: ${url}`);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
