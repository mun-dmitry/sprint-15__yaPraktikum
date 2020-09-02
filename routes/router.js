const router = require('express').Router();
const {
  sendUsers, sendUserById, updateUser, updateAvatar,
} = require('../controllers/users');
const {
  sendCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/users', sendUsers);
router.get('/users/:userId', sendUserById);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

router.get('/cards', sendCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

const noSuchAddress = (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
};

router.use('*', noSuchAddress);

module.exports = router;
