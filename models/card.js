const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 30,
	},
	link: {
		type: String,
		required: true,
		match: /https?:\/\/(www\.)?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|([\w-]+\.([\w-]+\.)?[a-zA-Z]{2,3}))(:(([0-9]|[1-5][0-9]{1,4}|6[0-9]{1,3}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]|[7-9][0-9]{1,3})))?(\/[\w-]+)*#?\/?/
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	likes: [{
		type: mongoose.Schema.Types.ObjectId,
		default: [],
	}],
	createdAt: {
		type: Date,
		default: Date.now,
	}
});

module.exports = mongoose.model('card', cardSchema);