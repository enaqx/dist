/**
  * Node Worker tests
  */

import { assert }  from 'chai';
import Dist from '../';

describe('Node Worker', () => {
  describe('setState(state) and getState(state)', () => {
    it('should set and get node state', done => {
      const dist = new Dist();
      const onCreateCb = () => setState({ someValue: 'Hello, World!' });
      const node = dist.createNode({ onCreate: onCreateCb });
      node.getState('someValue').then(res => {
        assert.deepEqual(res, { someValue: 'Hello, World!' });
        done();
      });
    });
  });
});
