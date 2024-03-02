const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likes = [];

  blogs.map((blog) => {
    likes.push(blog.likes);
  });

  const totalLikes = likes.reduce((sum, item) => {
    return sum + item;
  }, 0);

  return totalLikes;
};

module.exports = {
  dummy,
  totalLikes
};
