const Song = require('../models/songs');

module.exports = async (req, res) => {
    try {
        const songs = await Song.find();
        console.log(songs.length);
        res.json(songs);
    }
    catch (e) {
        console.error('Error fetching songs:', e);
        res.status(500).json({ error: 'Failed to fetch songs' });
    }
}