/**
  * Distributed Data Holder
  */

import { fork } from 'child_process';

export default class Holder {
  constructor() {
    this.holder = fork('lib/workers/holderWorker', [
      JSON.stringify({

      })
    ]);
  }

  createInt(name, value) {
    this.holder.send({ type: 'createInt', name, value });
  }
}
