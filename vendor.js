'use strict';

const events = require('./events.js');
var faker = require('faker');
require('dotenv').config();


let storeName = process.env.STORE_NAME;

  setInterval(() => {
    const order = {
        time: faker.date.recent(),
        store: storeName,
        orderID: faker.random.uuid(),
        customer: faker.name.findName(),
        address: `${faker.address.streetAddress()},${faker.address.city()},${faker.address.stateAbbr()}`,
      };
      events.emit('pickup', order);
    
    
  }, 5000);





// }
//Whenever the ‘delivered’ event occurs
//Log “thank you” to the console
events.on('delivered', (payload) => {
  console.log(
    `VENDOR: Thank you for delivering ${payload.orderID}`,
  );
});

