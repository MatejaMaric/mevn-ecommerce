const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const {masterKey} = require("../config/env");

module.exports = {

  register(req, res) {
    if (req.body.password !== req.body.confirmPassword)
      res.json({status: "Passwords do not match!"});
    else {
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
      });

      newUser.save()
        .then(() => res.json({status: "User successfully registered!"}))
        .catch(err => res.json({
          status: "Error when registering user!",
          error: err
        }));
    }
  },

  login(req, res) {
    User.findOne({email: req.body.email}, (err, user) => {
      if (err)
        res.json({status: "Database error.", error: err});

      if (!bcrypt.compareSync(req.body.password, user.password))
        res.json({status: "Wrong credentials!"});
      else {
        const payload = {sub: user._id};
        const token = jwt.sign(payload, masterKey, {expiresIn: "1d"});
        res.json({
          status: "Successfully logged in!",
          token
        });
      }
    });
  }

};
