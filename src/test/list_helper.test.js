// const { test, describe } = require('node:test');
// const assert = require('node:assert');
// // const listHelper = require('../utils/list_helper');
// const listHelper = require('../utils/listhelper');
// const blogs = require('../utils/datablogs');

// describe('total likes', () => {
//   const listWithOneBlog = [
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//       likes: 5,
//       __v: 0
//     }
//   ];

//   test('empty blog', () => {
//     const result = listHelper.totalLikes([]);

//     assert.strictEqual(result, 0);
//   });

//   test('when list has only one blog, equals the likes of that', () => {
//     const result = listHelper.totalLikes(listWithOneBlog);

//     assert.strictEqual(result, 5);
//   });

//   test('calculate all likes', () => {
//     const result = listHelper.totalLikes(blogs);

//     assert.strictEqual(result, 36);
//   });
// });

// describe('favorite Blog', () => {
//   const expect = {
//     title: 'Canonical string reduction',
//     author: 'Edsger W. Dijkstra',
//     likes: 12
//   };

//   test('favorite blog with zero blogs', () => {
//     const result = listHelper.favoriteBlog([]);

//     assert.deepStrictEqual(result, {});
//   });

//   test('favorite blogs', () => {
//     const result = listHelper.favoriteBlog(blogs);

//     assert.deepStrictEqual(result, expect);
//   });
// });
