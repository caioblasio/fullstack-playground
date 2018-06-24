const mongoose = require('mongoose');
const PacientSchema = require('./Pacient');
const { Schema } = mongoose;

var ProjectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    createDate: { type: Date, default: Date.now },
    _user: [{type: Schema.Types.ObjectId, ref: 'User'}],
    pacients: [PacientSchema]

  });


  mongoose.model('Project', ProjectSchema);