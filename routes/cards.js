const fs = require('fs');
const path = require('path');

const sendCards = (req, res) => {
	const dataPath = path.resolve('./data/cards.json');
	fs.promises.readFile(dataPath, { encoding: 'utf8' })
		.then((data) => {
			res.send(JSON.parse(data));
		})
		.catch(() => {
			res.status(500);
			res.send('File not found');
		})
};

module.exports = sendCards;