const User = require('../../../model/userModel');

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

const dataInDB = async () => {
  const datas = await User.find({});

  return datas.map((data) => data.toJSON());
};

const contentType = /application\/json/;

module.exports = { initialUsers, dataInDB, contentType };
