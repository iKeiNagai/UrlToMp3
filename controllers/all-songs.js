const Song = require('../models/songs');

module.exports = async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(20);
    const sortBy = req.query.sortBy;
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1; //1 for asc,-1 for desc
    const filter = req.query.filter;

    //console.log(filter);
    //console.log(sortBy, sortOrder);
    //console.log(page, limit);

    const skipOver = (page - 1) * limit;
    //console.log('skipOver:', skipOver);

    try {
        const query = {}

        if (filter) {
            query.title = { $regex: filter, $options: 'i' };
        }

        console.log('Query:', query);
        const songs = await Song.find(query)
            .sort({ [sortBy]: sortOrder })
            .skip(skipOver)
            .limit(limit);


        const total = await Song.countDocuments();
        //console.log('Total songs:', total);

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