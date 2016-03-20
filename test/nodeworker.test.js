/**
  * Node Worker tests
  */

import { assert }  from 'chai';
import Dist from '../';

describe('Node Worker', () => {
  describe('setState(state)', () => {
    it('should set Node state', (done) => {
      const dist = new Dist();
      const onCreateCb = () => setState({ someValue: 'Hello, World!' });
      const node = dist.createNode({ onCreate: onCreateCb });
      assert.isObject(node);
      setTimeout(() => {
        assert.deepEqual(
          node.state,
          { someValue: 'Hello, World!' }
        );
        done()
      }, 1000);
    });
  });
});
