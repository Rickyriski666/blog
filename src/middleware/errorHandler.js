const logger = require('../utils/logger/logger');

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).json({
      status: 'Error',
      message: 'malformatted ID'
    });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      status: 'Failed to save',
      message: error.message
    });
  }
};

module.exports = errorHandler;
