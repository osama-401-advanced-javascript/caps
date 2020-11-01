'use strict';

const events = require("./events.js");


events.on('pickup', payload => log('pickup', payload));
events.on('in-transit', payload => log('in-transit', payload));
require('./vendor.js');
require('./driver')
events.on('delivered', payload => log('delivered', payload));



// GIVES TIMESTAMP TO PAYLOAD 
function log(event, payload) {
  console.log("EVENT", {event,time:new Date() , payload});
}
module.exports=events