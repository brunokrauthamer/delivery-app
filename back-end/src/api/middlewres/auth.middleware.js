const { validateToken } = require('../utils/jwt.utils');

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  const { validated, data } = validateToken(authorization);
  if (!validated) {
    return res.status(403).json({ message: 'You must provide a valid token' });
  }
  const { payload } = data;
  req.body.payload = payload;
  next();
};

module.exports = authMiddleware;