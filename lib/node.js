/**
  * Node Class
  */

import { fork } from 'child_process';

export default class Node {
  constructor(opts) {
    this.node = fork('lib/workers/node', [
      JSON.stringify({
        onCreate: `(${opts.onCreate.toString()})`,
        sharedData: Object.keys(opts.sharedData)
      })
    ]);
    this.onCreate = opts.onCreate;
    this.onDestroy = opts.onDestroy;
    this.onRecreate = opts.onRecreate;
    this.sharedData = opts.sharedData;
    this.connected = this.node.connected;
    this.pid = this.node.pid;

    this.node.on('message', msg => {
      if ( msg.type === 'getSharedData' ) {
        this.sharedData[msg.name].holder.holder.send({
          type: 'getValue',
          name: msg.name,
          uuid: msg.uuid,
        });
        this.sharedData[msg.name].holder.holder.on('message', res => {
          if ( msg.uuid === res.uuid ) {
            this.node.send({
              type: 'responseGetData',
              name: res.name,
              value: res.value,
              uuid: res.uuid,
            });
          }
        })
      };
      if ( msg.type === 'setSharedData' ) {
        this.sharedData[msg.name].holder.holder.send({
          type: 'setValue',
          name: msg.name,
          newValue: msg.newValue,
        });
      }
      if ( msg.type === 'changeSharedData' ) {
        this.sharedData[msg.name] = msg.newValue;
      };
    })
  }

  destroy() {
    this.onDestroy();
    this.node.kill();
  }

  recreate() {
    this.node = fork('lib/workers/node', [
      JSON.stringify({
      })
    ]);
    this.connected = this.node.connected;
    this.pid = this.node.pid;

    this.onRecreate();
  }
}
