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
    it('should create new Node with custom id', () => {
      const dist = new Dist();
      const node = dist.createNode({ id: '123' });
      assert.isObject(node);
      assert.deepEqual(dist.nodes, [ node.id ]);
    });
    it('should throw error on creating nodes with same custom id', () => {
      const dist = new Dist();
      const node1 = dist.createNode({ id: '123' });
      assert.throws(() => dist.createNode({ id: '123' }));
    });
  });
});
