const router = require('express').Router();
const { doesUserExist, sendUser, sendUsers, noSuchAddress } = require('./routes.js');
const sendCards = require('./cards.js');

router.get('/users', sendUsers);
router.get('/cards', sendCards);
router.get('/users/:id', doesUserExist);
router.get('/users/:id', sendUser);
router.get('/:address', noSuchAddress);

module.exports = router;