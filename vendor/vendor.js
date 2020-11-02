'use strict';

const net = require('net');
const socket = net.Socket();
const faker = require('faker');

const client = new net.Socket();

//Connect to the CAPS server
const host = 'localhost';
const port = 4000;
const storeName = '1-206-flowers';

client.connect(port, host, () => {
  console.log(`Connected to ${host} : ${port}`);
});

//Every 5 seconds, simulate a new customer order
setInterval(() => {
  //Create an order object with your store name, order id, customer name, address
  //HINT: Have some fun by using the faker library to make up phony information

  const order = {
    store: storeName,
    orderID: faker.random.uuid(),
    customer: faker.name.findName(),
    address: `${faker.address.streetAddress()},${faker.address.city()},${faker.address.stateAbbr()}`,
  };

  //Create a message object with the following keys:
  //event - ‘pickup’
  //payload - the order object you created in the above step
  let event = JSON.stringify({ event: 'pickup', payload: order });
  //Write that message (as a string) to the CAPS server
  client.write(event);
}, 5000);

//Listen for the data event coming in from the CAPS server
//When data arrives, parse it (it should be JSON) and look for the event property
client.on('data', function (data) {
  let jsonPayload = JSON.parse(data);
  //Whenever the ‘delivered’ event occurs
  //Log “thank you” to the console
  if (jsonPayload.event === 'delivered') {
    console.log(`Driver :Thank you for deliver ${jsonPayload.payload.orderID}`);
    //Ignore any data that specifies a different event
  }
});
