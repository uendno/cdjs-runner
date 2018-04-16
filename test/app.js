const spawn = require('child_process').spawn;

const cli = spawn('node', ['./cd.js'], {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc']
});

cli.stdout.on('data', data => console.log(`stdout: ${data}`));
cli.stderr.on('data', data => console.log(`stderr: ${data}`));
// cli.on('message', data => {
//     console.log('message:', data);
// });

cli.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});


funcA()
    .then(() => funcB())
    .then(() => funcC())
    .then(() => funcD())
    .catch(error => {
        console.error(error);
    })