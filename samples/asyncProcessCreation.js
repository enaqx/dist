const cp = require('child_process');

cp.spawn('node', [ 'proc1.js' ]).stdout.on('data', data => process.stdout.write(`Spawn Process #1: ${data}`));
cp.spawn('node', [ 'proc2.js' ]).stdout.on('data', data => process.stdout.write(`Spawn Process #2: ${data}`));
cp.spawn('node', [ 'proc3.js' ]).stdout.on('data', data => process.stdout.write(`Spawn Process #3: ${data}`));

cp.exec('node proc1', (err, stdout) => process.stdout.write(`Exec Process #1: ${stdout}`));
cp.exec('node proc2', (err, stdout) => process.stdout.write(`Exec Process #2: ${stdout}`));
cp.exec('node proc3', (err, stdout) => process.stdout.write(`Exec Process #3: ${stdout}`));

cp.fork('proc1');
cp.fork('proc2');
cp.fork('proc3');
