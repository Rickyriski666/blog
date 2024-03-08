const _ = require('lodash');
const totalLikes = require('./totalLikes');

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const groupedAuthor = [];

  blogs.forEach((blog) => {
    if (!groupedAuthor[blog.author]) {
      groupedAuthor[blog.author] = [];
    }
    groupedAuthor[blog.author].push(blog.likes);
  });

  let highestLikes = 0;
  let authorHighestLikes = '';

  for (const author in groupedAuthor) {
    const likes = totalLikes(groupedAuthor[author]);
    if (likes >= highestLikes) {
      highestLikes = likes;
      authorHighestLikes = author;
    }
  }

  const result = {
    author: authorHighestLikes,
    likes: highestLikes
  };

  return result;
};

module.exports = mostLikes;
