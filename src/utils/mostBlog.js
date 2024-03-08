const _ = require('lodash');
const blogs = require('./datablogs');

const mostBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  let groupedAuthor = [];

  blogs.forEach((blogs) => {
    if (!groupedAuthor[blogs.author]) {
      groupedAuthor[blogs.author] = [];
    }

    groupedAuthor[blogs.author].push(blogs);
  });

  let author = '';
  let mostBlog = 0;

  for (const key in groupedAuthor) {
    if (groupedAuthor[key].length > mostBlog) {
      author = key;
      mostBlog = groupedAuthor[key].length;
    }
  }

  const result = {
    author: author,
    blogs: mostBlog
  };

  return result;
};

console.log(mostBlog(blogs));

module.exports = mostBlog;
