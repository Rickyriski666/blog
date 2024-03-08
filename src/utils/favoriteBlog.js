const favoriteBlog = (blogs) => {
  const fav = (blog) => {
    if (!blog) {
      return {};
    }

    const returnedBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes
    };

    return returnedBlog;
  };

  let favorite = fav(blogs[0]);

  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > favorite.likes) {
      favorite = fav(blogs[i]);
    }
  }

  return favorite;
};

module.exports = favoriteBlog;
