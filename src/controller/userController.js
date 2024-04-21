const userRouter = require('express').Router();
const DB = require('../models');
const middleware = require('../middleware/');
const hashPassword = require('../utils/hashPassword');

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await DB.userModel.find({}).populate('blogs', { user: 0 });

    res.status(200).json({
      status: 'Success get users',
      data: users,
    });
  } catch (error) {
    next(error);
  }
});

userRouter.post('/', middleware.validatePassword, async (req, res, next) => {
  try {
    const { username, name, password } = req.body;

    const encryptPassword = await hashPassword(password);

    const user = new DB.userModel({
      username,
      name,
      password: encryptPassword,
    });

    const savedUser = await user.save();

    res.status(201).json({
      status: 'Success create user',
      data: savedUser,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
