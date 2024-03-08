const { test, describe } = require('node:test');
const assert = require('node:assert');
const favoriteBlog = require('../utils/favoriteBlog');

describe('favoriteBlog', () => {
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

  test('empty blog list should return an empty object', () => {
    const result = favoriteBlog([]);

    assert.deepStrictEqual(result, {});
  });

  test('blog list with one blog should return that blog as the favorite', () => {
    const result = favoriteBlog([blogs[0]]);

    assert.deepStrictEqual(result, {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    });
  });

  test('blog list with multiple blogs should return the blog with the most likes', () => {
    const result = favoriteBlog(blogs);

    assert.deepStrictEqual(result, {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    });
  });
});
