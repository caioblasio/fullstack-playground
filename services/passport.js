const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;




passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'
  }, (email, password, done) => {
        
  }));