const app = require('./app');
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const logger = require('./config/logger');

/** Create socket server
*/


/* Socket Middleware */
const socketAuth = (socket, next) => {
  // Do something with the socket or next
  next();
}

/* Start server*/
io.use(socketAuth).on('connection', (socket) => {
  logger.info('New client connected');
  logger.info(socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const emitNotifyAction = function (args) {
  io.sockets.emit('NEW_NOTIFICATION', ...args);
};

module.exports.server = httpServer;
module.exports.emitNotifyAction = emitNotifyAction;