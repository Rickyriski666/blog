const express = require('express');
const app = express();
const cors = require('cors');
const Route = require('./controller');
const middleware = require('./middleware/index');
const validateToken = require('./middleware/validateToken');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/login', Route.loginRouter);
app.use('/api/blogs', validateToken, Route.blogRouter);
app.use('/api/users', Route.userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
