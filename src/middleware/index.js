const errorHandler = require('./errorHandler');
const unknownEndpoint = require('./unknownEndpoint');
const validatePassword = require('./validatePassword');

module.exports = {
  errorHandler: errorHandler,
  unknownEndpoint: unknownEndpoint,
  validatePassword: validatePassword,
};
