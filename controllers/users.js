const User = require('../models/user');

const sendUsers = (req, res) => {
	User.find({})
		.then(users => res.send({ data: users }))
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: 'Internal server error' })
		});
};

const sendUserById = (req, res) => {
	User.findById(req.params.userId)
		.then(user => res.send({ data: user }))
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: 'Internal server error' })
		});
};

const createUser = (req, res) => {
	const { name, about, avatar } = req.body;
	User.create({ name, about, avatar })
		.then(user => res.send({ data: user }))
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: 'Internal server error' })
		});
};

module.exports = {
	sendUsers,
	sendUserById,
	createUser
};