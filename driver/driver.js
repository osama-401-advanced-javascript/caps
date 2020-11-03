'use strict';
const io = require('socket.io-client');
const caps = io.connect('http://localhost:3000/caps');

caps.on('connect', () => {
  caps.on('pickup', (payload) => {
    let id = payload.orderID;

    setTimeout(() => {
      console.log(`Picking up ${id}`);
      caps.emit('in-transit', payload);
    }, 1500);

    setTimeout(() => {
      console.log(`delivered ${payload.orderID}`);
      caps.emit('delivered', payload);
    }, 3000);
  });
});
