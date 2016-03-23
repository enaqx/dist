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
      timeout: opts.timeout,
      onCreate: opts.onCreate,
      onDestroy: opts.onDestroy,
      onMessage: opts.onMessage,
      onRecreate: opts.onRecreate,
      distData: opts.distData,
    });
    this.nodes.push(node.id);
    return node;
  }

  createNodes(nodeOpts) {
    if ( typeof nodeOpts === 'number' ) {
      let nodes = [];
      for ( let i = 0; i < nodeOpts; i++) nodes.push(this.createNode());
      return nodes;
    } else if (
      Object.prototype.toString.call(nodeOpts) === '[object Array]'
    ) {
      return nodeOpts.map(opts => this.createNode(opts));
    };
  }

  destroyNode(node) {
    node.destroy();
    this.nodes.splice(this.nodes.indexOf(node.id), 1);
  }

  destroyNodes(nodes) {
    if ( Object.prototype.toString.call(nodes) !== '[object Array]' ) {
      throw 'Dist#destroyNodes(nodeList) takes array of nodes as argument!';
    };
    nodes.forEach(node => {
      node.destroy();
      this.nodes.splice(this.nodes.indexOf(node.id), 1);
    });
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
