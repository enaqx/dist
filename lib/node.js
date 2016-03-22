/**
  * Node Class
  */

import { fork } from 'child_process';
import message from './message';
import shortid from 'shortid';

export default class Node {
  constructor(opts) {
    this.onCreate = opts.onCreate;
    this.onDestroy = opts.onDestroy;
    this.onMessage = opts.onMessage;
    this.onRecreate = opts.onRecreate;
    this.distData = opts.distData;
    this.timeout = opts.timeout;

    this.node = fork('lib/workers/nodeWorker', [
      JSON.stringify({
        onCreate: opts.onCreate ? `(${opts.onCreate.toString()})` : ``,
        onMessage: opts.onMessage ? `(${opts.onMessage.toString()})` : ``,
        sharedData: opts.distData ? Object.keys(opts.distData) : ``,
      })
    ]);
    this.pid = this.node.pid;
    this.id = opts.id ? opts.id : shortid.generate();

    this.state = {};

    this.node.on('message', msg => {
      if ( msg.type === 'getSharedData' ) {
        this.distData[msg.name].holder.holder.send({
          type: 'getValue',
          name: msg.name,
          uuid: msg.uuid,
        });
        this.distData[msg.name].holder.holder.on('message', res => {
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
      if ( msg.type === 'setDistData' ) {
        this.distData[msg.name].holder.holder.send({
          type: 'setValue',
          name: msg.name,
          newValue: msg.newValue,
        });
      }
      if ( msg.type === 'changeDistData' ) {
        this.distData[msg.name] = msg.newValue;
      };
    });

    if ( this.timeout ) setTimeout(this.destroy(), this.timeout);
  }

  destroy() {
    if ( this.onDestroy ) this.onDestroy()
    this.node.kill();
  }

  recreate() {
    this.node = fork('lib/workers/nodeWorker', [
      JSON.stringify({
      })
    ]);
    this.pid = this.node.pid;

    this.onRecreate();
  }

  send(msg) {
    this.node.send(message({
      type: 'parentToChild',
      data: msg,
    }));
  }

  isConnected() {
    return this.node.connected;
  }

  getState(state) {
    return new Promise((resolve, reject) => {
      const msg = message({
        type: 'dist_req_getState',
        data: state,
      })
      this.node.send(msg);
      this.node.on('message', msg => {
        resolve(msg);
      });
    });
  }
}
