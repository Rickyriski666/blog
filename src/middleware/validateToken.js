const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateToken = async (req, res, next) => {
  try {
    const token = req.get('authorization').replace('Bearer ', '');

    const decode = jwt.verify(token, process.env.SECRET);

    req.user = {
      id: decode.id,
      username: decode.username,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateToken;
