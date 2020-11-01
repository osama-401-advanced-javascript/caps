'use strict';
const caps = require('../caps.js');
jest.spyOn(global.console, 'log');

describe('Caps logger method working', () => {
  it('looger method for pickup event', () => {
    caps.emit('pickup', 'test');
    expect(console.log).toHaveBeenCalled();
  });
  it('looger method for in-trsnsit event', () => {
    caps.emit('in-transit', 'test');
    expect(console.log).toHaveBeenCalled();
  });
  it('looger method for in-trsnsit event', () => {
    caps.emit('delivered', 'test');
    expect(console.log).toHaveBeenCalled();
  });
});
