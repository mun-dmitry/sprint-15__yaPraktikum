const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const {
  sendUsers, sendUserById, updateUser, updateAvatar,
} = require('../controllers/users');
const {
  sendCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const NotFoundError = require('../errors/NotFoundError');
const urlValidationHelper = require('../middlewares/urlValidationHelper');

router.get('/users', sendUsers);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.objectId(),
  }),
}), sendUserById);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().required().custom(urlValidationHelper, 'custom URL validation'),
  }),
}), updateAvatar);

router.get('/cards', sendCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri().custom(urlValidationHelper, 'custom URL validation'),
  }),
}), createCard);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId(),
  }),
}), deleteCard);

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId(),
  }),
}), likeCard);

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId(),
  }),
}), dislikeCard);

const noSuchAddress = (req, res, next) => {
  const error = new NotFoundError('Requested URL not found');
  next(error);
};

router.use('*', noSuchAddress);

module.exports = router;
