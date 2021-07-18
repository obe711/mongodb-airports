const mongoose = require('mongoose');
const config = require('./config/config');
const logger = require('./config/logger');
const { server } = require('./io');

/**
 * Connect to MongoDB
 * 
*/
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {

  logger.info('Connected to MongoDB');

  /* Create HTTP & Websocket servers */
  server.listen(config.port, () => logger.info(`Listening on port ${config.port}`));

});

/* Stop app if servers die */
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

/* Catch unexpected errors */
const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

/* Try to free up port on termination */
process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
