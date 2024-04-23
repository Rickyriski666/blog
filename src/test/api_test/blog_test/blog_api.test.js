const { test, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const DB = require('../../../models');
const helper = require('./api_test_helper');

const supertest = require('supertest');
const app = require('../../../app');
const api = supertest(app);
const { default: mongoose } = require('mongoose');

beforeEach(async () => {
  await DB.blogModel.deleteMany({});
  await DB.userModel.deleteMany({});

  for (const user of helper.initialUsers) {
    await api.post('/api/users').send(user);
  }

  const userID = await helper.userID();
  const token = await helper.getToken();
  for (const blog of helper.initialBlogs) {
    await api
      .post('/api/blogs')
      .send({ ...blog, userId: userID })
      .set('Authorization', `Bearer ${token}`);
  }
});

test('return must be JSON', async () => {
  const token = await helper.getToken();
  await api
    .get('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', helper.contentType);
});

test('verify identifier id', async () => {
  const blogs = await helper.blogSaved();

  blogs.map((blog) => {
    assert.ok(blog.hasOwnProperty('id'));
    assert.ok(!blog.hasOwnProperty('_id'));
  });
});

test('post a valid blog', async () => {
  const userID = await helper.userID();
  const token = await helper.getToken();

  const newBlog = {
    title: 'newBlog',
    author: 'newAuthor',
    url: 'newUrl.com',
    likes: 10,
    userId: userID,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(201)
    .expect('Content-Type', helper.contentType);

  const response = await helper.blogSaved();
  const content = response.map((blog) => blog.title);

  assert.strictEqual(response.length, helper.initialBlogs.length + 1);
  assert(content.includes('newBlog'));
});

test('verify likes if empty = 0', async () => {
  const userID = await helper.userID();
  const token = await helper.getToken();

  const newBlog = {
    title: 'like0',
    author: 'like0',
    url: 'like0.com',
    userId: userID,
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(201)
    .expect('Content-Type', helper.contentType);

  const savedBlog = response.body.data;

  assert.strictEqual(savedBlog.likes, 0);
});

test('should fail to create blog with title or url are missing', async () => {
  const userID = await helper.userID();
  const token = await helper.getToken();

  const newBlog = [
    {
      title: '',
      author: 'mising author',
      url: 'misingauthor.com',
      likes: 1,
      userId: userID,
    },
    {
      title: 'mising url',
      author: 'mising url',
      url: '',
      likes: 1,
      userId: userID,
    },
    {
      title: '',
      author: 'both missing',
      url: '',
      likes: 1,
      userId: userID,
    },
  ];

  for (const blog of newBlog) {
    await api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
      .expect('Content-Type', helper.contentType);
  }
});

test('should fail to create a blog with worng credential', async () => {
  const userID = await helper.userID();
  const token = await api
    .post('/login')
    .send({ username: 'usertest2', password: 'passwordUserTest2' })
    .then((res) => res.body.data.token);

  const newBlog = {
    title: 'wrong credential',
    author: 'wrong credential',
    url: 'wrongcredential.com',
    likes: 2,
    userId: userID,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(401)
    .expect('Content-Type', helper.contentType);
});

after(async () => {
  return await mongoose.connection.close();
});
