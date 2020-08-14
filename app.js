const express = require('express');
const path = require('path');
const { PORT = 3000 } = process.env;
const router = require('./routes/router.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
	useNewUrlParser: true,
  useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
})

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

app.listen(PORT);