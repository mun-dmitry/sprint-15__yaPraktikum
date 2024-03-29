const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const { JWT_SECRET = 'dev-key' } = process.env;

const sendUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const sendUserById = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`${err.value} is not a valid ObjectId`));
      }
      next(err);
    });
};

const validatePassword = (password) => {
  const passwordRegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
  return passwordRegExp.test(password);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  return User.checkDuplicatingFields(name, email)
    .then(() => {
      bcrypt.hash(password, 10)
        .then((hash) => {
          if (!validatePassword(password)) {
            throw new BadRequestError('Password has to be at least 8 characters, including at least 1 digit character, 1 lowercase alphabetic character and 1 uppercase alphabetic character. Password can contain only alphanumeric characters');
          }
          return User.create({
            name,
            about,
            avatar,
            email,
            password: hash,
          });
        })
        .then((user) => {
          User.findById(user._id)
            .then((createdUser) => res.send({ data: createdUser }))
            .catch(next);
        });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'MongoError') {
        next(new ConflictError(`Supposed to get unique name and email. ${JSON.stringify(err.keyValue)} already exists.`));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      }
      next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token, id: user._id });
    })
    .catch(next);
};

module.exports = {
  sendUsers,
  sendUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
