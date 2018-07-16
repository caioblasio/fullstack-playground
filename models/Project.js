const mongoose = require('mongoose');
const { Schema } = mongoose;

var ProjectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    createDate: { type: Date, default: Date.now },
    _users: [{type: Schema.Types.ObjectId, ref: 'User', required: true}],
    pacients: [{type: Schema.Types.ObjectId, ref: 'Pacient'}]

  });


  ProjectSchema.methods.toJSON = function(){
    return {
      _id: this._id,
      name: this.name,
      createDate: this.createDate,
      _users: this._user
    };
  };


  mongoose.model('Project', ProjectSchema);