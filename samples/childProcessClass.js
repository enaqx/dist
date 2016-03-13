const cp = require('child_process');

const node = cp.fork('proc1');

console.log(node.pid);
