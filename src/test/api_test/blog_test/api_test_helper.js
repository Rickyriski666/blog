const Blog = require('../../model/blog');

const initialBlogs = [
  {
    title: 'blog 1 test',
    author: 'blog 1 author',
    url: 'blog1.com',
    likes: 25
  },
  {
    title: 'blog 2 test',
    author: 'blog 2 author',
    url: 'blog2.com',
    likes: 25
  }
];

const blogSaved = async () => {
  const blogs = await Blog.find({});

  return blogs.map((blog) => blog.toJSON());
};

const contentType = /application\/json/;

module.exports = { initialBlogs, blogSaved, contentType };
