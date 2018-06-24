const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'
  }, (email, password, done) => {
    User.findOne({email: email}).then((user) => {
      if(!user || !user.validPassword(password)){
        return done(null, false, {errors: {'email or password': 'is invalid'}});
      }
  
      return done(null, user);
    }).catch(done);
  }));