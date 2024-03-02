const blogRouter = require('express').Router();
const Blog = require('../model/blog');

blogRouter.get('/', (req, res) => {
  Blog.find({}).then((blogs) => {
    res.status(200).json({
      status: 'success',
      data: blogs
    });
  });
});

blogRouter.post('/', (req, res) => {
  const blog = new Blog(req.body);

  blog.save().then((savedBlog) => {
    res.status(200).json({
      status: 'success',
      data: savedBlog
    });
  });
});

module.exports = blogRouter;
