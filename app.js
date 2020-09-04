require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const router = require('./routes/router.js');
const { login, createUser } = require('./controllers/users.js');
const auth = require('./middlewares/auth.js');

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

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use('/', router);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Internal server error'
      : message,
  });
});

app.listen(PORT);
