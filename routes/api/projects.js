const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');
const Project = mongoose.model('Project');
const auth = require('../auth');

// Preload article objects on routes with ':article'
router.param('project', function(req, res, next, projectId) {
    Project.findById(projectId).then(function(project){
        if(!project) { return res.sendStatus(404); }

        req.project = project;

        return next();
        }).catch(next);
});

router.get('/:project', auth.optional, function(req, res, next) {
      return res.json({project: req.project.toJSON()});
  });


router.post('/', auth.required, (req, res, next) => {
    const { name } = req.body;

    if(!name){
      return res.status(422).json({errors: {name: "can't be blank"}});
    }

    const project = new Project({
        name,
        _users: req.payload.id
    });

    project.save().then(function(){
        return res.json(project);
      }).catch(next);
  
  });

  module.exports = router;