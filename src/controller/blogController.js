const blogRouter = require('express').Router();
const DB = require('../models');

blogRouter.get('/', async (req, res, next) => {
  try {
    console.log(req.user);

    const blogs = await DB.blogModel.find({}).populate('user', {
      username: 1,
      name: 1,
    });

    DB.blogModel.find;
    res.status(200).json({
      status: 'success',
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
});

blogRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const blog = await DB.blogModel.findById(id);

    if (blog) {
      res.status(200).json({
        status: 'success',
        data: blog,
      });
    } else {
      res.status(404).json({
        status: 'Data Not Found',
        data: blog,
      });
    }
  } catch (error) {
    next(error);
  }
});

blogRouter.post('/', async (req, res, next) => {
  try {
    const { title, author, url, likes, userId } = req.body;
    const user = await DB.userModel.findById(userId);

    const blog = new DB.blogModel({
      title,
      author,
      url,
      likes,
      user: user.id,
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json({
      status: 'success',
      data: savedBlog,
    });
  } catch (error) {
    next(error);
  }
});

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const blog = await DB.blogModel.findById(id);
    const user = req.user;

    if (blog) {
      if (blog.user.toString() === user.id.toString()) {
        await DB.blogModel.findByIdAndDelete(id);

        res.status(204).json({
          status: 'delete successfull',
        });
      } else {
        res.status(401).json({
          status: 'Unauthorized',
          message: 'Failed to delete',
        });
      }
    } else {
      res.status(404).json({
        status: 'Data Not Found',
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

    const updatedBlog = await DB.blogModel.findByIdAndUpdate(id, blog, {
      returnDocument: 'after',
    });

    if (updatedBlog) {
      res.status(200).json({
        status: 'update successfull',
        data: updatedBlog,
      });
    } else {
      res.status(404).json({
        status: 'Data Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
