const passport = require('passport');
const LocalStrategy = require('passport-local');
const Admin = require('../src/models/adminModel');

passport.use(new LocalStrategy({
  email: 'user[email]',
  password: 'user[password]',
}, (email, password, done) => {
  Admin.findOne({ email })
    .then((admin) => {
      if (!admin || !admin.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }
      return done(null, admin);
    }).catch(done);
}));
