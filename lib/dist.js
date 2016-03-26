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
    if ( opts.id && typeof opts.id !== 'string' ) {
      throw 'Node id should be string!';
    };
    if ( this.nodes.map(node => node.id).indexOf(opts.id) != -1 ) {
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
    this.nodes.push(node);
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
    this.nodes.splice(this.nodes.indexOf(node.id), 1);
    return node.destroy();
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
    return this.nodes.filter(node => node.id === id)[0];
  }

  getNodes(idList) {
    return this.nodes.filter(node => idList.indexOf(node.id) != -1 );
  }

  recreateNode(node) {
    node.recreate();
  }

  createHolder() {
    return new Holder()
  }
}
