require('dotenv').config();
require('./config/db');

const express = require('express');
const limiter = require('./middleware/rateLimiter');
const routes = require('./routes/routes');
const cors = require('cors');

const app = express();

app.use(cors());
//app.set('trust proxy', 1); //use when behind a reverse proxy
app.use(express.static('public'));
app.use(express.json());
app.use(limiter);
app.use(routes);

module.exports = app;
