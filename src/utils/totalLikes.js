const totalLikes = (blogs) => {
  const likes = [];

  blogs.map((blog) => {
    if (!blog.likes) {
      likes.push(blog);
    } else {
      likes.push(blog.likes);
    }
  });

  const totalLikes = likes.reduce((sum, item) => {
    return sum + item;
  }, 0);

  return totalLikes;
};

module.exports = totalLikes;
