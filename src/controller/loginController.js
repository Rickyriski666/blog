const loginRouter = require('express').Router();
const DB = require('../models');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await DB.userModel.find({});
});
