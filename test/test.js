/**
  * Tests
  */

import { assert }  from 'chai';

describe('Test', () => {
  describe('#test', () => {
    it('should pass', () => {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});
