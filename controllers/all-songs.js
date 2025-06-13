const Song = require('../models/songs');

module.exports = async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(20);
    console.log(page, limit);

    const skipOver = (page - 1) * limit;
    console.log('skipOver:', skipOver);

    try {
        const songs = await Song.find()
            .sort({downloadedAt: -1 })
            .skip(skipOver)
            .limit(limit);


        const total = await Song.countDocuments();
        console.log('Total songs:', total);

        res.json({
            totalPages: Math.ceil(total / limit), //needed by react-paginate
            currentPage: page,
            totalSongs: total,
            songs
        });
    }
    catch (e) {
        console.error('Error fetching songs:', e);
        res.status(500).json({ error: 'Failed to fetch songs' });
    }
}