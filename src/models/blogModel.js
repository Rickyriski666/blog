const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title required'],
  },
  author: {
    type: String,
    required: [true, 'Author required'],
  },
  url: {
    type: String,
    required: [true, 'url required'],
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
});

blogSchema.pre('save', function (next) {
  if (!this.likes || this.likes === '') {
    this.likes = 0;
  }
  next();
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;

    return {
      id: returnedObject.id,
      ...returnedObject,
    };
  },
});

module.exports = blogSchema;
