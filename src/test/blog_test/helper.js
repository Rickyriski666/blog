const DB = require('../../models');
const supertest = require('supertest');
const app = require('../../app');
const api = supertest(app);

const initialBlogs = [
  {
    title: 'blog 1 test',
    author: 'blog 1 author',
    url: 'blog1.com',
    likes: 25,
  },
  {
    title: 'blog 2 test',
    author: 'blog 2 author',
    url: 'blog2.com',
    likes: 25,
  },
];

const initialUsers = [
  {
    username: 'usertest1',
    name: 'usertest1',
    password: 'passwordUserTest1',
  },
  {
    username: 'usertest2',
    name: 'usertest2',
    password: 'passwordUserTest2',
  },
];

const contentType = /application\/json/;

const blogSaved = async () => {
  const blogs = await DB.blogModel.find({});

  return blogs.map((blog) => blog.toJSON());
};

const userID = async () => {
  const users = await DB.userModel.find({});

  return users[0].id.toString();
};

const getToken = async () => {
  const token = await api
    .post('/login')
    .send({ username: 'usertest1', password: 'passwordUserTest1' })
    .then((res) => {
      return res.body.data.token;
    });

  return token;
};

module.exports = {
  initialBlogs,
  initialUsers,
  blogSaved,
  contentType,
  userID,
  getToken,
};
