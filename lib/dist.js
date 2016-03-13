/**
  * Dist Class
  */

import Holder from './holder';
import Node from './node';

export default class Dist {
  static createNode(opts) {
    return new Node({
      onCreate: opts.onCreate,
      onDestroy: opts.onDestroy,
      onRecreate: opts.onRecreate,
      sharedData: opts.sharedData,
    });
  }

  static destroyNode(node) {
    node.destroy();
  }

  static recreateNode(node) {
    node.recreate();
  }

  static createHolder() {
    return new Holder()
  }
}
