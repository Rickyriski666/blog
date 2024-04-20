const mongoose = require('mongoose');
const blogSchema = require('./blogModel');
const userSchema = require('./userModel');
require('dotenv').config();

const URL =
  process.env.NODE_ENV === 'test'
    ? process.env.BLOG_DB_TEST
    : process.env.BLOG_DB;

mongoose.set('strictQuery', false);

mongoose
  .connect(URL)
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });

const blogModel = mongoose.model('Blog', blogSchema);
const userModel = mongoose.model('User', userSchema);

module.exports = { blogModel, userModel };
