const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { cookie } = req.headers;
  if (!cookie || !cookie.startsWith('jwt=')) {
    return res.status(401).send({ message: 'Authorization required' });
  }
  const token = cookie.replace('jwt=', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    return res.status(401).send({ message: 'Authorization required' });
  }
  req.user = payload;
  next();
}