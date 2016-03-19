/**
  * Node Worker Instance
  */

'use strict';

const uuid = require('node-uuid');

const props = JSON.parse(process.argv[2]);
const timeout = props.timeout;

class DistData {
  constructor(name) {
    this.name = name
  }

  get() {
    return new Promise((resolve, reject) => {
      process.send({
        type: 'getDistData',
        name: this.name,
        uuid: uuid.v4(),
      });
      process.on('message', msg => {
        resolve(msg.value);
      });
    });
  }

  set(value) {
    process.send({
      type: 'setDistData',
      name: this.name,
      newValue: value,
    });
  }
}

if ( props.distData ) {
  for (let distData of props.distData) {
    global[distData] = new DistData(distData);
  }
}

if ( props.onCreate ) {
  eval(props.onCreate)();
}

if ( props.onMessage ) {
  process.on('message', msg => {
    msg = msg.data;
    eval(props.onMessage)()
  })
}


setTimeout(null, timeout);
