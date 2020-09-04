const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Authorization required'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    const { JWT_SECRET = 'dev-key' } = process.env;
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Authorization required'));
  }
  req.user = payload;
  return next();
};
