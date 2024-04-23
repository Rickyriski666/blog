const logger = require('../utils/logger/logger');

const errorHandler = (error, req, res, next) => {
  logger.error(`ERROR NAME : ${error.name}`);
  logger.error(error.stack);

  if (error.name === 'CastError') {
    return res.status(400).json({
      status: 'Error',
      message: 'malformatted ID',
    });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      status: 'Failed to save',
      message: error.message,
    });
  }

  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'Failed',
      message: error.message,
    });
  }
};

module.exports = errorHandler;
