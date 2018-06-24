const mongoose = require('mongoose');

var PacientSchema = new mongoose.Schema({
    name: String,
    document: String,
    phoneNumber: [Number],
    paymentDay: Number,
    createDate: { type: Date, default: Date.now },
  });


  mongoose.model('Pacient', PacientSchema);