const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./routes/router.js');
const { login, createUser } = require('./controllers/users.js');

const { PORT = 3000 } = process.env;

const app = express();

// eslint-disable-next-line no-console
console.log(`server running on port ${PORT}`);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
  req.user = {
    _id: '5f364f7677896926601f203e',
  };

  next();
});
app.post('/signin', login);
app.post('/signup', createUser);
app.use('/', router);

app.listen(PORT);
