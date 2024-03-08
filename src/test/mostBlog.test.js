const mostBlog = require('../utils/mostBlog');
const { test, describe } = require('node:test');
const assert = require('node:assert');

describe('mostBlog', () => {
  test('empty blog list', () => {
    const blogs = [];
    const result = mostBlog(blogs);
    assert.deepStrictEqual(result, {});
  });

  test('single blog', () => {
    const blogs = [
      {
        _id: '1',
        title: 'Blog 1',
        author: 'Author 1',
        url: 'https://example.com/blog1',
        likes: 10,
        __v: 0
      }
    ];
    const result = mostBlog(blogs);
    assert.deepStrictEqual(result, {
      author: 'Author 1',
      blogs: 1
    });
  });

  test('multiple blogs with different authors', () => {
    const blogs = [
      {
        _id: '1',
        title: 'Blog 1',
        author: 'Author 1',
        url: 'https://example.com/blog1',
        likes: 10,
        __v: 0
      },
      {
        _id: '2',
        title: 'Blog 2',
        author: 'Author 2',
        url: 'https://example.com/blog2',
        likes: 5,
        __v: 0
      },
      {
        _id: '3',
        title: 'Blog 3',
        author: 'Author 1',
        url: 'https://example.com/blog3',
        likes: 8,
        __v: 0
      }
    ];
    const result = mostBlog(blogs);
    assert.deepStrictEqual(result, {
      author: 'Author 1',
      blogs: 2
    });
  });

  test('multiple blogs with same author', () => {
    const blogs = [
      {
        _id: '1',
        title: 'Blog 1',
        author: 'Author 1',
        url: 'https://example.com/blog1',
        likes: 10,
        __v: 0
      },
      {
        _id: '2',
        title: 'Blog 2',
        author: 'Author 1',
        url: 'https://example.com/blog2',
        likes: 5,
        __v: 0
      },
      {
        _id: '3',
        title: 'Blog 3',
        author: 'Author 1',
        url: 'https://example.com/blog3',
        likes: 8,
        __v: 0
      }
    ];
    const result = mostBlog(blogs);
    assert.deepStrictEqual(result, {
      author: 'Author 1',
      blogs: 3
    });
  });
});
