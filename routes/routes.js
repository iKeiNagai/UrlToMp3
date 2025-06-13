const router = require('express').Router();
const controllers = require('../controllers');

// convert to mp3 endpoint
router.post('/convert', controllers.convert);

//save song endpoint
router.post('/save-song', controllers.saveSong);

// download endpoint
router.get('/download/:filename', controllers.download);

// get all songs endpoint
router.get('/all-songs', controllers.getAllSongs);

module.exports = router;