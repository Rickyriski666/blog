const DB = require('../../../models');

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

const dataInDB = async () => {
  const datas = await DB.userModel.find({});

  return datas.map((data) => data.toJSON());
};

const userID = async () => {
  const users = await dataInDB();

  return users[0].id;
};

const contentType = /application\/json/;

module.exports = { initialUsers, initialBlogs, dataInDB, userID, contentType };
