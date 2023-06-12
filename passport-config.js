const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/user');

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    const user = await User.findOne({email: email});
    if (user == null) return done(null, false, 'no user with that email');

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, 'password incorrect');
      }
    } catch (error) {
      return done(error);
    }
  }

  passport.use(new LocalStrategy({usernameField:'email'}, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    User.findById(id).then(result => {done(null, result)});
  });
}

module.exports = initialize;