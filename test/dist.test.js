/**
  * Distirbuted system tests
  */

import { assert }  from 'chai';
import Dist from '../';

describe('Dist', () => {
  describe('new', () => {
    it('should create new Distributed System', () => {
      const dist = new Dist();
      assert.isObject(dist);
      assert.isArray(dist.nodes);
    });
  });

  describe('#createNode(opts)', () => {
    it('should create new Node', () => {
      const dist = new Dist();
      const node = dist.createNode();
      assert.isObject(node);
      assert.deepEqual(dist.nodes, [ node.id ]);
    });
    it('should create new nodes with custom id', () => {
      const dist = new Dist();
      const node1 = dist.createNode({ id: '1' });
      const node2 = dist.createNode({ id: '2' });
      const node3 = dist.createNode({ id: '3' });
      assert.isObject(node1, node2, node3);
      assert.deepEqual(
        dist.nodes.sort(),
        [ node1.id, node2.id, node3.id ].sort()
      );
    });
    it('should throw error on creating nodes with same custom id', () => {
      const dist = new Dist();
      const node1 = dist.createNode({ id: '123' });
      assert.throws(() => dist.createNode({ id: '123' }));
    });
    it('should create new Node with with specified timeout', (done) => {
      const dist = new Dist();
      const node = dist.createNode({  timeout: 250 });
      assert.isObject(node);
      assert.isTrue(node.isConnected());
      setTimeout(() => {
        assert.isFalse(node.isConnected());
        done();
      }, 500);
    });
  });
});
