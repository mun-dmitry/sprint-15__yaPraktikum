const users = require('../data/users.json');
const cards = require('../data/cards.json');

const doesUserExist = (req, res, next) => {
  if (!users.some(user => {
    return user._id === req.params.id;
  })) {
    res.status(404);
    res.send({ "message": "Нет пользователя с таким id" });
    return;
  }
  next();
};

const sendUser = (req, res) => {
  res.send(users.find(user => {
    return user._id === req.params.id;
  }));
};

const noSuchAddress = (req, res) => {
	res.status(404);
  res.send({ "message": "Запрашиваемый ресурс не найден" });
};

const sendUsers = (req, res) => {
	res.send(users);
};

const sendCards = (req, res) => {
	res.send(cards);
};

module.exports = {
	doesUserExist,
	sendUser,
	sendUsers,
	noSuchAddress,
	sendCards
}