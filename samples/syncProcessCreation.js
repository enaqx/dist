const cp = require('child_process');

process.stdout.write(`Spawn Process #1: ${cp.spawnSync('node', [ 'proc1.js' ]).stdout}`);
process.stdout.write(`Spawn Process #2: ${cp.spawnSync('node', [ 'proc2.js' ]).stdout}`);
process.stdout.write(`Spawn Process #3: ${cp.spawnSync('node', [ 'proc3.js' ]).stdout}`);

process.stdout.write(`Exec Process #1: ${cp.execSync('node proc1')}`);
process.stdout.write(`Exec Process #2: ${cp.execSync('node proc2')}`);
process.stdout.write(`Exec Process #3: ${cp.execSync('node proc3')}`);
