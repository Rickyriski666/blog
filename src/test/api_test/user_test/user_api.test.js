const { test, describe, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const User = require('../../../model/userModel');
const supertest = require('supertest');
const app = require('../../../app');
const api = supertest(app);
const helper = require('./user_test_helper');

beforeEach(async () => {
  await User.deleteMany({});

  for (const user of helper.initialUsers) {
    let newUser = new User(user);
    await newUser.save();
  }
});

describe('get user function', () => {
  test('should return user data in Json format', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', helper.contentType);
  });
});

describe('create new user function', () => {
  test('should fail to create a user if the username isnt unique', async () => {
    const newUser = {
      username: 'usertest1',
      name: 'usertest5',
      password: 'passwordUserTest5',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect('Content-Type', helper.contentType)
      .expect(400)
      .then((res) => {
        assert(res.body.message.includes('username to be unique'));
      });

    const dataInDB = await helper.dataInDB();

    assert.strictEqual(dataInDB.length, helper.initialUsers.length);
  });

  test('should fail to create a user if the username isnt unique', async () => {
    const newUser = {
      username: 'usertest1',
      name: 'usertest5',
      password: 'passwordUserTest5',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', helper.contentType);

    const response = await helper.dataInDB();

    assert.strictEqual(response.length, helper.initialUsers.length);
  });
});

afterEach(async () => {
  await mongoose.connection.close();
});
