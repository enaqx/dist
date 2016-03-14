/**
  * Dist.js
  */

import Dist from './lib/dist';

const onCreate1 = () => console.log(`Create callaback for #1`);
const onCreate2 = () => console.log(`Create callaback for #2`);
const onCreate3 = () => console.log(`Create callaback for #3`);
const onMessage = () => console.log(msg);

const timeout = 6000;

const node1 = Dist.createNode({ onCreate: onCreate1, onMessage, timeout });
const node2 = Dist.createNode({ onCreate: onCreate2, onMessage, timeout });
const node3 = Dist.createNode({ onCreate: onCreate3, onMessage, timeout });

node1.send('Send message to #1');
node2.send('Send message to #2');
node3.send('Send message to #3');
