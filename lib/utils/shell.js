const spawn = require('child_process').spawn;
const options = require('../options');
const log = require('../helpers/log');

module.exports = (command) => () => {

    log("> " + command);

    return new Promise((resolve, reject) => {
        const opts = {
            stdio: 'inherit',
            shell: true,
        };

        if (options.cwd) {
            opts.cwd = options.cwd
        }

        const cli = spawn(command, opts);

        cli.on('close', (code) => {
            if (code === 0) {
                return resolve(code);
            } else {
                return reject(code);
            }
        });
    })
};