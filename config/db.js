const mongoose = require('mongoose');

const mongodbURI = process.env.MONGODB_URI;

mongoose.connect(mongodbURI);

const db = mongoose.connection;

db.on('error',(err) => console.error('MongoDB connection error:', err));
db.once('open', () => console.log('MongoDB connected'));