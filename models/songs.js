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

//optimize sorting 
songSchema.index({duration: 1})
songSchema.index({downloadedAt: -1});

module.exports = mongoose.model('Song', songSchema);