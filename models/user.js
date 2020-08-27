const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const bcrypt = require('bcryptjs');

const urlValidator = [
  validate({
    validator: 'isURL',
    message: 'supposed to get a valid URL',
  }),
];
const emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'supposed to get a valid E-mail',
  }),
];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: urlValidator,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    validate: emailValidator,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Wrong email or password'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Wrong email or password'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
