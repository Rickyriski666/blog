const { test, describe } = require('node:test');
const assert = require('node:assert');
const mostLikes = require('../utils/mostLikes');
const blogs = require('../utils/datablogs');

describe('mostLikes', () => {
  test('returns an empty object when the blog list is empty', () => {
    const result = mostLikes([]);

    assert.deepStrictEqual(result, {});
  });

  test('returns the author with the most likes and the total number of likes', () => {
    const result = mostLikes(blogs);

    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 17
    });
  });

  test('returns the first author with the most likes when there are multiple authors with the same number of likes', () => {
    const blogsWithSameLikes = [
      {
        _id: '1',
        title: 'Blog 1',
        author: 'Author 1',
        likes: 10
      },
      {
        _id: '2',
        title: 'Blog 2',
        author: 'Author 2',
        likes: 20
      },
      {
        _id: '3',
        title: 'Blog 3',
        author: 'Author 1',
        likes: 10
      }
    ];

    const result = mostLikes(blogsWithSameLikes);

    assert.deepStrictEqual(result, {
      author: 'Author 2',
      likes: 20
    });
  });
});
