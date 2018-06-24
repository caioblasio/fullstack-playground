const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');
const Project = mongoose.model('Project');
const auth = require('../auth');

router.post('/', auth.required, (req, res, next) => {
    const { name } = req.body;

    if(!name){
      return res.status(422).json({errors: {name: "can't be blank"}});
    }

    const project = new Project({
        name,
        _user: req.payload.id
    });

    project.save().then(function(){
        return res.json(project);
      }).catch(next);
  
  });

  module.exports = router;