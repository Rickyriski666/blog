const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const db = require('../db/blog_DB');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, minLength: 8, required: true },
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
    return {
      id: returnedObject.id,
      ...returnedObject,
    };
  },
});

userSchema.plugin(uniqueValidator, {
  message: 'Error, expected {PATH} to be unique.',
});

const User = db.model('user', userSchema);

module.exports = User;
