/**
  * Node Worker Instance
  */

import uuid from 'node-uuid';

const props = JSON.parse(process.argv[2]);

class SharedData {
  constructor(name) {
    this.name = name
  }

  get() {
    return new Promise((resolve, reject) => {
      process.send({
        type: 'getSharedData',
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
      type: 'setSharedData',
      name: this.name,
      newValue: value,
    });
  }
}

if ( props.sharedData ) {
  for (let shared of props.sharedData) {
    global[shared] = new SharedData(shared);
  }
}

if ( props.onCreate ) {
  eval(props.onCreate)();
}


setTimeout(null, 100000);
