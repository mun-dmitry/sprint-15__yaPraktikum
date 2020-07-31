const fs = require('fs');
const path = require('path');
const dataPath = path.resolve('./data/users.json');

const doesUserExist = (req, res, next) => {
	fs.promises.readFile(dataPath, 'utf-8')
		.then((data) => {
			const users = JSON.parse(data);
			if (!users.some(user => {
				return user._id === req.params.id;
			})) {
				res.status(404).send({ "message": "Нет пользователя с таким id" });
				return;
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send({ "message": "Internal server error" });
		});

  next();
};

const sendUser = (req, res) => {
	fs.promises.readFile(dataPath, 'utf-8')
		.then((data) => {
			const users = JSON.parse(data);
			const user = users.find(user => {
				return user._id === req.params.id;
			})
			res.send(user);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send({ "message": "Internal server error" });
		});
};

const sendUsers = (req, res) => {
	fs.promises.readFile(dataPath, 'utf-8')
		.then((data) => {
			res.send(JSON.parse(data));
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send({ "message": "Internal server error" });
		});
};

module.exports = {
	sendUsers,
	doesUserExist,
	sendUser
};