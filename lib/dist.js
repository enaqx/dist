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
    opts = opts || {};
    if ( this.nodes.indexOf(opts.id) != -1) {
      throw 'Attempt to create Node with already taken id!';
    };
    const node = new Node({
      id: opts.id,
      onCreate: opts.onCreate,
      onDestroy: opts.onDestroy,
      onMessage: opts.onMessage,
      onRecreate: opts.onRecreate,
      timeout: opts.timeout,
      distData: opts.distData,
    });
    this.nodes.push(node.id);
    return node;
  }

  destroyNode(node) {
    node.destroy();
    this.nodes.splice(this.nodes.indexOf(node.id), 1);
  }

  getNode(id) {

  }

  recreateNode(node) {
    node.recreate();
  }

  createHolder() {
    return new Holder()
  }
}
