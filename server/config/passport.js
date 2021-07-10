const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;

const {masterKey} = require("../config/env");
const User = require('../models/User');

const options = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: masterKey
};

const jwtStrategyCallback = (jwtPayload, done) => {
  // Try to find user
  User.findOne({_id: jwtPayload.sub}, (err, user) => {
    // Database error
    if (err)
      return done(err, false);

    // No user found
    if (!user)
      return done(null, false);

    // Successful login
    return done(null, user);
  })
};

passport.use(new jwtStrategy(options, jwtStrategyCallback));
