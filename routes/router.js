const router = require('express').Router();

const { sendUsers, sendUserById, createUser, updateUser, updateAvatar } = require('../controllers/users');
router.get('/users', sendUsers);
router.get('/users/:userId', sendUserById);
router.post('/users', createUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

const { sendCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');
router.get('/cards', sendCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

const noSuchAddress = (req, res) => {
	res.status(404);
  res.send({ "message": "Запрашиваемый ресурс не найден" });
};

router.get('*', noSuchAddress);

module.exports = router;