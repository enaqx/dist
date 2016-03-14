/**
  * Message Generator
  */

import uuid from 'node-uuid';

export default opts => {
  return {
    type: opts.type,
    uuid: uuid.v4(),
    data: opts.data,
  };
}
