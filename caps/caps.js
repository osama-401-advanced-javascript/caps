'use strict';

const net = require('net');
const uuidv4 = require('uuid').v4;
const PORT = process.env.PORT || 4000;

const server = net.createServer();
server.listen(PORT, () => console.log(`Server is running on ${PORT}`));

const socketPool = {};

//connection is a built in event that will be triggered when a client.connect() is implemented
// 1 a
server.on('connection', (socket) => {
  console.log('Socket Connected!');
  const id = `socket-${uuidv4()}`;
  socketPool[id] = socket;
  socket.on('data', (buffer) => dispatchEvent(buffer));
  socket.on('error', (e) => console.log('SOCKET ERROR', e.message));
  socket.on('end', (id) => delete socketPool[id]);
});
server.on('error', (e) => console.log('SERVER ERROR', e.message));

// 5
function dispatchEvent(buffer) {
  const message = JSON.parse(buffer.toString().trim());
  if (message.event == 'pickup') {
    log('pickup', message);
  }
  if (message.event == 'in-transit') {
    log('in-transit', message);
  }
  if (message.event == 'delivered') {
    log('delivered', message);
  }
  broadcast(message);
}

function broadcast(message) {
  const payload = JSON.stringify(message);
  for (let socket in socketPool) {
    socketPool[socket].write(payload);

    //6
  }
}

function log(event, payload) {
  let time = new Date();
  console.log('EVENT', { event, time, payload });
}
