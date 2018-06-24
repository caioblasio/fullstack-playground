const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(keys.mongoURI)

//require('./services/passport');
require('./models/User');
app.use(require('./routes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT);