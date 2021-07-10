const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "You need to provide your first name."],
    maxLength: [32, "You can't have a first name longer than 32 characters."],
    validate: {
      validator: validator.isAlpha,
      message: props => "Your first name can only contain characters."
    }
  },
  lastname: {
    type: String,
    required: [true, "You need to provide your last name."],
    maxLength: [32, "You can't have a last name longer than 32 characters."],
    validate: {
      validator: validator.isAlpha,
      message: props => "Your last name can only contain characters."
    }
  },
  email: {
    type: String,
    unique: [true, "Account with given email already exists!"],
    required: [true, "You need to provide an email."],
    maxLength: [100, "You can't have a email longer than 100 characters."],
    validate: {
      validator: validator.isEmail,
      message: props => "Provided email is not valid."
    }
  },
  password: {
    type: String,
    required: [true, "You need to provide a password."],
  },
});

const UserModel = new mongoose.model('User', UserSchema);

module.exports = UserModel;
