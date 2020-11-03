'use strict';
var faker = require('faker');
const io = require('socket.io-client');
const caps = io.connect('http://localhost:3000/caps');

caps.on('connect', () => {
  let storeName = '1-206-flowers';
  caps.emit('join', storeName);
  setInterval(() => {
    let order = {
      store: storeName,
      orderID: faker.random.uuid(),
      customer: faker.name.findName(),
      address: `${faker.address.streetAddress()},${faker.address.city()},${faker.address.stateAbbr()}`,
    };
    caps.emit('pickup', order);
  }, 3000);

  caps.on('delivered', (payload) => {
    console.log(`Thank you for delivering ${payload.orderID}`);
  });
});
