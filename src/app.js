const express = require('express');
const app = express();
const cors = require('cors');
const blogRoute = require('./controller/blogController');
const middleware = require('./middleware/index');
const userRouter = require('./controller/userController');

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRoute);
app.use('/api/users', userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
