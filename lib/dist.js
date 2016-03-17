/**
  * Dist Class
  */

import Holder from './holder';
import Node from './node';

export default class Dist {
  constructor() {
    this.nodes = []
  }

  createNode(opts) {
    const node = new Node({
      onCreate: opts.onCreate,
      onDestroy: opts.onDestroy,
      onMessage: opts.onMessage,
      onRecreate: opts.onRecreate,
      timeout: opts.timeout,
      distData: opts.distData,
    });
    this.nodes.push(node.pid);
    return node;
  }

  destroyNode(node) {
    node.destroy();
    this.nodes.splice(this.nodes.indexOf(node.pid), 1);
  }

  recreateNode(node) {
    node.recreate();
  }

  createHolder() {
    return new Holder()
  }
}
