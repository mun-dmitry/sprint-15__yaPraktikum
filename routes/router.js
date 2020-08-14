const router = require('express').Router();

const { sendUsers, sendUserById, createUser } = require('../controllers/users');
router.get('/users', sendUsers);
router.get('/users/:userId', sendUserById);
router.post('/users', createUser);

const { sendCards, createCard, deleteCard } = require('../controllers/cards');
router.get('/cards', sendCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);

const noSuchAddress = (req, res) => {
	res.status(404);
  res.send({ "message": "Запрашиваемый ресурс не найден" });
};

router.get('*', noSuchAddress);

module.exports = router;