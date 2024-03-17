const mongoose = require('mongoose');
require('dotenv').config();

const URL =
  process.env.NODE_ENV === 'test'
    ? process.env.BLOG_DB_TEST
    : process.env.BLOG_DB;

console.log('connecting to db');

mongoose
  .connect(URL)
  .then(() => {
    console.log('connected to db');
  })
  .catch((error) => {
    console.log(error.message);
  });

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title required']
  },
  author: {
    type: String,
    required: [true, 'Author required']
  },
  url: {
    type: String,
    required: [true, 'url required']
  },
  likes: {
    type: Number,
    default: 0
  }
});

blogSchema.pre('save', function (next) {
  if (!this.likes || this.likes === '') {
    this.likes = 0;
  }
  next();
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
