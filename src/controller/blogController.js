const blogRouter = require('express').Router();
const Blog = require('../model/blog');

blogRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({});

    console.log(blogs);

    res.status(200).json({
      status: 'success',
      data: blogs
    });
  } catch (error) {
    next(error);
  }
});

blogRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);

    if (blog) {
      res.status(200).json({
        status: 'success',
        data: blog
      });
    } else {
      res.status(404).json({
        status: 'Data Not Found',
        data: blog
      });
    }
  } catch (error) {
    next(error);
  }
});

blogRouter.post('/', async (req, res, next) => {
  try {
    const blog = new Blog(req.body);

    const savedBlog = await blog.save();

    res.status(201).json({
      status: 'success',
      data: savedBlog
    });
  } catch (error) {
    next(error);
  }
});

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (deletedBlog) {
      res.status(204).json({
        status: 'delete successfull'
      });
    } else {
      res.status(404).json({
        status: 'Data Not Found'
      });
    }
  } catch (error) {
    next(error);
  }
});

blogRouter.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const blog = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
      returnDocument: 'after'
    });

    if (updatedBlog) {
      res.status(200).json({
        status: 'update successfull',
        data: updatedBlog
      });
    } else {
      res.status(404).json({
        status: 'Data Not Found'
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
