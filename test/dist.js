/**
  * Distirbuted system tests
  */

import { assert }  from 'chai';
import Dist from '../lib/dist'

describe('Dist', () => {
  describe('new', () => {
    it('should create new Distributed System', () => {
      assert.isObject(new Dist());
    });
  });
});
