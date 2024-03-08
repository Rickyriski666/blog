const { test, describe } = require('node:test');
const assert = require('node:assert');
const totalLikes = require('../utils/totalLikes');

describe('totalLikes', () => {
  const blogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'https://example.com',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f0',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'https://example.com',
      likes: 7,
      __v: 0
    }
  ];

  test('empty blog list should return 0 likes', () => {
    const result = totalLikes([]);

    assert.strictEqual(result, 0);
  });

  test('blog list with one blog should return the likes of that blog', () => {
    const result = totalLikes([blogs[0]]);

    assert.strictEqual(result, 5);
  });

  test('blog list with multiple blogs should return the sum of all likes', () => {
    const result = totalLikes(blogs);

    assert.strictEqual(result, 24);
  });
});
