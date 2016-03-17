/**
  * Distributed Integer
  */

import uuid from 'node-uuid';

export default class DistInt {
  constructor(holder, name, value) {
    this.holder = holder;
    this.name = name;
    this.holder.createInt(name, value)
  }

  get() {
    return new Promise((resolve, reject) => {
      this.holder.holder.send({
        type: 'getValue',
        name: this.name,
        uuid: uuid.v4(),
      });
      process.on('message', msg => {
        resolve(msg.value);
      });
    });
  }
}
