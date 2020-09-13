const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const bcrypt = require('bcryptjs');

const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');

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
userSchema.statics.findUserByCredentials = function (email, password, next) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      const error = new UnauthorizedError('Wrong email or password');
      if (!user) {
        throw error;
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw error;
          }
          return user;
        });
    })
    .catch(next);
};

// eslint-disable-next-line func-names
userSchema.statics.checkDuplicatingFields = function (name, email, next) {
  return this.findOne({ $or: [{ name }, { email }] })
    .then((user) => {
      if (user) {
        if (user.name === name) {
          throw new ConflictError(`User with name '${user.name}' already exists. Please enter another username`);
        }
        if (user.email === email) {
          throw new ConflictError(`User with email '${user.email}' already exists. Please enter another email`);
        }
      }
    })
    .catch(next);
};

module.exports = mongoose.model('user', userSchema);
