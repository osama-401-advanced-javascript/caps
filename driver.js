'use strict';

const events = require('./events.js');

// monitor pickup for event
events.on('pickup', (payload) => {
  // WAIT 1 SECOND
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderID}`);
    //Log “DRIVER: picked up [ORDER_ID]” to the console.
    //Emit an ‘in-transit’ event with the payload you received

    events.emit('in-transit', payload);
  }, 1000);

  // AFTER 3 SECONDS
  setTimeout(() => {
    //Log “delivered” to the console
    //Emit a ‘delivered’ event with the same payload
    console.log(`DRIVER: delivered ${payload.orderID}`);
    events.emit('delivered', payload);
  }, 3000);
});
