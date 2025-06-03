const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    videoId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    downloadedAt: {
        type: Date,
        inmutable: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Song', songSchema);