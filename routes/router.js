const router = require('express').Router();
const {
  sendUsers, sendUserById, updateUser, updateAvatar,
} = require('../controllers/users');
const {
  sendCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const NotFoundError = require('../errors/NotFoundError');

router.get('/users', sendUsers);
router.get('/users/:userId', sendUserById);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

router.get('/cards', sendCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

const noSuchAddress = (req, res, next) => {
  const error = new NotFoundError('Requested URL not found');
  next(error);
};

router.use('*', noSuchAddress);

module.exports = router;
