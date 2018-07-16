const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if(process.env.NODE_ENV !== 'test'){
    mongoose.connect(keys.mongoURI)
}

require('./models/User');
require('./models/Pacient');
require('./models/Project');
require('./services/passport');
app.use(require('./routes'));

app.use((err, req, res, next) => {
    res.status(err.status).send({ error: err.message });
});

module.exports = app;