const Card = require('../models/card');

const sendCards = (req, res) => {
	Card.find({})
		.then(cards => res.send({ data: cards }))
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: 'Internal server error' })
		});
};

const createCard = (req, res) => {
	const { name, link } = req.body;
	const owner = req.user._id;
	Card.create({ name, link, owner })
		.then(card => res.send({ data: card }))
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: 'Internal server error' })
		});
};

const deleteCard = (req, res) => {
	Card.findByIdAndRemove(req.params.cardId)
		.then(card => res.send({ data: card }))
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: 'Internal server error' })
		});
};

module.exports = {
	sendCards,
	createCard,
	deleteCard
}