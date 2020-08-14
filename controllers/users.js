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
		.then(user => {
			if (!user) {
				res.status(404).send({ message: 'User not found'});
				return;
			};
			res.send({ data: user })
		})
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
			res.status(400).send({ message: err._message })
		});
};

const updateUser = (req, res) => {
	const { name, about } = req.body;
	User.findByIdAndUpdate(req.user._id,
		{
			name: name,
			about: about
		},
		{
			new: true,
			runValidators: true,
		})
		.then(user => {
			if (!user) {
				res.status(404).send({ message: 'User not found'});
				return;
			};
			res.send({ data: user })
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: 'Internal server error' })
		});
};

const updateAvatar = (req, res) => {
	const { avatar } = req.body;
	User.findByIdAndUpdate(req.user._id,
		{
			avatar: avatar
		},
		{
			new: true,
			runValidators: true,
		})
		.then(user => {
			if (!user) {
				res.status(404).send({ message: 'User not found'});
				return;
			};
			res.send({ data: user })
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send({ message: 'Internal server error' })
		});
};

module.exports = {
	sendUsers,
	sendUserById,
	createUser,
	updateUser,
	updateAvatar
};