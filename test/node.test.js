/**
  * Nodes tests
  */

import { assert }  from 'chai';
import Dist from '../';

describe('Node', () => {
  describe('Dist.createNode(opts)', () => {
    it('should create new nodes', () => {
      const dist = new Dist();
      const node1 = dist.createNode();
      const node2 = dist.createNode();
      const node3 = dist.createNode();
      assert.isObject(node1, node2, node3);
      assert.deepEqual(
        dist.nodes.sort(),
        [ node1.id, node2.id, node3.id ].sort()
      );
    });
  });

  describe('#isConnected()', () => {
    it('should check if Node is connected', () => {
      const dist = new Dist();
      const node = dist.createNode({ timeout: 250 });
      assert.isObject(node);
      assert.isTrue(node.isConnected());
    });
  });
});