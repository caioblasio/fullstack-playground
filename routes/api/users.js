const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const User = mongoose.model('User');
const auth = require('../auth');

router.get('/user', auth.required, (req, res, next) => {

  User.findById(req.payload.id).then(function(user){
    return res.json({user: user.toAuthJSON()});
  }).catch(next);

});

router.post('/users/login', (req, res, next) => {

  passport.authenticate('local', {session: false}, (err, user, info) => {
    if(err){ return next(err); }

    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post('/users', (req, res, next) => {
    var user = new User();
  
    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.setPassword(req.body.user.password);
  
    user.save().then(function(){
      return res.json({user: user.toAuthJSON()});
    }).catch(next);
    
  });

module.exports = router;