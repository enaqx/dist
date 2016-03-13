/**
  * Dist.js
  */

import Dist from './lib/dist';
import SharedInt from './lib/data/int';

const holder = Dist.createHolder();
const sharedInt = new SharedInt(holder, 'sharedInt', 0);

const onCreate = () => {
  sharedInt.get().then(res => {
    sharedInt.set(res + 1)
  });
}

const onCreateLast = () => {
  sharedInt.get().then(res => console.log(res));
}

const onDestroy = () => console.log(`Destroy callback #${process.pid}`);
const onRecreate = () => console.log(`Recreate callback #${process.pid}`);

const node1 = Dist.createNode({ onCreate, onDestroy, onRecreate,
  sharedData: { sharedInt },
});

const node2 = Dist.createNode({ onCreate, onDestroy, onRecreate,
  sharedData: { sharedInt },
});

const node3 = Dist.createNode({ onCreate, onDestroy, onRecreate,
  sharedData: { sharedInt },
});

setTimeout(() => Dist.createNode({
  onCreate: onCreateLast,
  sharedData: { sharedInt }
}), 3000);

setTimeout(null, 100000);
