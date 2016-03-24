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
      assert.deepEqual(dist.nodes.map(node => node.id).sort(), [ node.id ]);
    });

    it('should create new nodes with custom id', () => {
      const dist = new Dist();
      const node1 = dist.createNode({ id: '1' });
      const node2 = dist.createNode({ id: '2' });
      const node3 = dist.createNode({ id: '3' });
      assert.isObject(node1, node2, node3);
      assert.deepEqual(
        dist.nodes.map(node => node.id).sort(),
        [ node1.id, node2.id, node3.id ].sort()
      );
    });

    it('should throw error on creating nodes with same custom id', () => {
      const dist = new Dist();
      const node = dist.createNode({ id: '123' });
      assert.throws(() => dist.createNode({ id: '123' }));
    });

    it('should create new Node with with specified timeout', done => {
      const dist = new Dist();
      const node = dist.createNode({ timeout: 500 });
      assert.isObject(node);
      assert.isTrue(node.isConnected());
      setTimeout(() => {
        assert.isFalse(node.isConnected());
        done();
      }, 1000);
    });

    it('should create new Node with onCreate callback', done => {
      const dist = new Dist();
      const onCreateCb = () => setState({ someValue: 'Hello, World!' });
      const node = dist.createNode({ onCreate: onCreateCb });
      node.getState('someValue').then(res => {
        assert.deepEqual(res, { someValue: 'Hello, World!' });
        done();
      });
    });
  });

  describe('#createNodes([opts])', () => {
    it('should create list of node when passed number as argument', () => {
      const amountOfNodes = 5;
      const dist = new Dist();
      const nodes = dist.createNodes(amountOfNodes);
      assert.isArray(nodes);
      for ( let i = 0; i < amountOfNodes; i++ ) assert.isObject(nodes[i]);
      assert.deepEqual(
        dist.nodes.map(node => node.id).sort(),
        nodes.map(node => node.id).sort()
      );
    });

    it('should create list of node when passed array of node opts', () => {
      const dist = new Dist();
      const nodes = dist.createNodes([ { id: '1' }, { id: '2' }, { id: '3' } ]);
      assert.isArray(nodes);
      assert.deepEqual(
        dist.nodes.map(node => node.id).sort(),
        [ nodes[0].id, nodes[1].id, nodes[2].id ].sort()
      );
    });
  });

  describe('#destroyNode(node)', () => {
    it('should destroy node and remove it from nodes list', done => {
      const dist = new Dist();
      const node = dist.createNode();
      assert.deepEqual(dist.nodes.map(node => node.id), [ node.id ]);
      dist.destroyNode(node);
      assert.deepEqual(dist.nodes, []);
      setTimeout(() => {
        assert.isFalse(node.isConnected());
        done();
      }, 1000);
    });
  });

  describe('#destroyNodes(nodes)', () => {
    it('should destroy nodes and remove them from nodes list', done => {
      const amountOfNodes = 5;
      const dist = new Dist();
      const nodes = dist.createNodes(amountOfNodes);
      assert.deepEqual(
        dist.nodes.map(node => node.id).sort(),
        nodes.map(node => node.id).sort()
      );
      dist.destroyNodes(nodes);
      assert.deepEqual(dist.nodes, []);
      setTimeout(() => {
        nodes.map(node => assert.isFalse(node.isConnected()));
        done();
      }, 1000);
    });

    it('should throw error on passing nonarray argument', () => {
      const dist = new Dist();
      assert.throws(() => dist.destroyNodes({}));
      assert.throws(() => dist.destroyNodes(1));
      assert.throws(() => dist.destroyNodes('Hello, World!'));
    });
  });

  describe('#getNode(nodeId)', () => {
    it('should return node by id', () => {
      const idList = [ { id: '1' }, { id: '2' }, { id: '3' } ];
      const dist = new Dist();
      const nodes = dist.createNodes(idList);
      idList.forEach(idx => assert.equal(idx.id, dist.getNode(idx.id).id));
    })
  });

  describe('#getNodes(nodeIdList)', () => {
    it('should return node by id', () => {
      const idList = [ { id: '1' }, { id: '2' }, { id: '3' } ];
      const dist = new Dist();
      const nodes = dist.createNodes(idList);
      assert.deepEqual(
        idList.slice(0, 2),
        dist.getNodes(idList.slice(0, 2)
            .map(idx => idx.id))
            .map(node => { return { id: node.id } })
      );
    })
  });
});
