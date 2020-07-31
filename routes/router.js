const router = require('express').Router();
const sendCards = require('./cards.js');
const { sendUsers, doesUserExist, sendUser } = require('./users.js');

const noSuchAddress = (req, res) => {
	res.status(404);
  res.send({ "message": "Запрашиваемый ресурс не найден" });
};

router.get('/users', sendUsers);
router.get('/cards', sendCards);
router.get('/users/:id', doesUserExist);
router.get('/users/:id', sendUser);
router.get('/:address', noSuchAddress);

module.exports = router;