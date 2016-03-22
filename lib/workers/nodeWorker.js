/**
  * Node Worker Instance
  */

'use strict';

const uuid = require('node-uuid');

const props = JSON.parse(process.argv[2]);

let nodeState = {};

process.on('message', msg => {
  if ( msg.type === 'dist_req_getState' ) {
    let res = {};
    res[msg.data] = nodeState[msg.data];
    process.send(res);
  }
});

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

const message = (opts) => {
  return {
    type: opts.type,
    uuid: uuid.v4(),
    data: opts.data,
  };
}

const setState = (states) => {
  Object.keys(states).forEach(state => {
    nodeState[state] = states[state]
  });
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
