const loginRouter = require('express').Router();
const DB = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

loginRouter.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await DB.userModel.findOne({ username });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        status: 'Invalid Username or Password',
      });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    res.status(200).send({
      status: 'Login Succesfull',
      data: {
        token,
        username: user.username,
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
