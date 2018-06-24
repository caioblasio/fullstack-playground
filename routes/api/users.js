var mongoose = require('mongoose');
var router = require('express').Router();
// var passport = require('passport');
var User = mongoose.model('User');
// var auth = require('../auth');

router.get('/user', (req, res) => {
//   User.findById(req.payload.id).then(function(user){
//     if(!user){ return res.sendStatus(401); }

//     return res.json({user: user.toAuthJSON()});
//   }).catch(next);

    res.send({hi: 'future 3'});
});

router.post('/users', (req, res, next) => {
    var user = new User();
  
    console.log(req.body);
    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.setPassword(req.body.user.password);
  
    user.save().then(function(){
      return res.json({user: user.toAuthJSON()});
    }).catch(next);
  });

module.exports = router;