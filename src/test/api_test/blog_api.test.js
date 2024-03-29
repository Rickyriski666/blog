const { test, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const Blog = require('../../model/blog');
const helper = require('./api_test_helper');

const supertest = require('supertest');
const app = require('../../app');
const { default: mongoose } = require('mongoose');
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (const blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test('return must be JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('verify identifier id', async () => {
  const blogs = await helper.blogSaved();

  blogs.map((blog) => {
    assert.ok(blog.hasOwnProperty('id'));
    assert.ok(!blog.hasOwnProperty('_id'));
  });
});

test('post a valid blog', async () => {
  const newBlog = {
    title: 'newBlog',
    author: 'newAuthor',
    url: 'newUrl.com',
    likes: 10
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', helper.contentType);

  const response = await helper.blogSaved();
  const content = response.map((blog) => blog.title);

  assert.strictEqual(response.length, helper.initialBlogs.length + 1);
  assert(content.includes('newBlog'));
});

test('verify likes if empty = 0', async () => {
  const newBlog = {
    title: 'like0',
    author: 'like0',
    url: 'like0.com'
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', helper.contentType);

  const savedBlog = response.body.data;

  assert.strictEqual(savedBlog.likes, 0);
});

test('create blog with title or url are missing', async () => {
  const newBlog = [
    {
      title: '',
      author: 'mising author',
      url: 'misingauthor.com',
      likes: 1
    },
    {
      title: 'mising url',
      author: 'mising url',
      url: '',
      likes: 1
    },
    {
      title: '',
      author: 'both missing',
      url: '',
      likes: 1
    }
  ];

  for (const blog of newBlog) {
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)
      .expect('Content-Type', helper.contentType);
  }
});

after(async () => {
  return await mongoose.connection.close();
});
