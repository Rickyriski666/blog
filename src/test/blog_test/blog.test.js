const DB = require('../../models');
const helper = require('./helper');
const supertest = require('supertest');
const app = require('../../app');
const { default: mongoose } = require('mongoose');
const api = supertest(app);

beforeEach(async () => {
  await DB.userModel.deleteMany({});
  await DB.blogModel.deleteMany({});

  for (const user of helper.initialUsers) {
    await api.post('/api/users').send(user);
  }

  const token = await helper.getToken();
  const userID = await helper.userID();
  for (const blog of helper.initialBlogs) {
    await api
      .post('/api/blogs')
      .send({ ...blog, userId: userID })
      .set('Authorization', `Bearer ${token}`);
  }
});

describe('get blogs', () => {
  test('should return json', async () => {
    const token = await helper.getToken();
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', helper.contentType);
  });

  test('should have an id property, intead _id ', async () => {
    const token = await helper.getToken();
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .then((res) => {
        return res.body.data;
      });

    for (const blog of response) {
      expect(blog.hasOwnProperty('id')).toBeTruthy();
      expect(blog.hasOwnProperty('_id')).toBeFalsy();
    }
  });
});

describe('Create a Blog', () => {
  test('should success create a blog', async () => {
    const token = await helper.getToken();
    const userID = await helper.userID();

    const newBlog = {
      title: 'newBlog',
      author: 'newBlog',
      url: 'newBlog.com',
      likes: 10,
      userId: userID,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', helper.contentType);

    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .then((res) => {
        return res.body.data;
      });

    const title = response.map((blog) => blog.title);

    expect(response).toHaveLength(helper.initialBlogs.length + 1);
    expect(title).toContain('newBlog');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
