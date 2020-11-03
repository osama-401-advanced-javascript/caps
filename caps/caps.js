'use strict';
const io = require('socket.io')(3000);
const caps = io.of('/caps');
let currentRoom = '';
caps.on('connection', (socket) => {
  socket.on('join', (room) => {
    socket.leave(currentRoom);
    socket.join(room);
    currentRoom = room;
  });

  socket.on('pickup', (payload) => {
    caps.emit('pickup', payload);
    log('pickup', payload);
  });
  socket.on('in-transit', (payload) => {
    caps.emit('in-transit', payload);
    log('in-transit', payload);
  });
  socket.on('delivered', (payload) => {
    caps.to(currentRoom).emit('delivered', payload);
    log('delivered', payload);
  });
});

//load the namespaces that we created to the server

io.on('connection', (socket) => {
  console.log('Welcome to the Global connection', socket.id);
  socket.on('error', (payload) => {
    console.log('error', payload);
  });
});

function log(event, payload) {
  let time = new Date();
  console.log('EVENT', { event, time, payload });
}
