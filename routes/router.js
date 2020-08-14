const router = require('express').Router();
const sendCards = require('./cards.js');
// const { sendUsers, sendUser } = require('./users.js');
const { sendUsers, sendUserById, createUser } = require('../controllers/users');

const noSuchAddress = (req, res) => {
	res.status(404);
  res.send({ "message": "Запрашиваемый ресурс не найден" });
};

router.get('/users', sendUsers);
router.get('/cards', sendCards);
router.get('/users/:userId', sendUserById);
router.post('/users', createUser);
router.get('*', noSuchAddress);

module.exports = router;