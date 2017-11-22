const options = require('../options');
const log = require('../helpers/log');

module.exports = (dir) => () => {
    log('Current working dir: ' + dir);
    options.cwd = dir;
    return Promise.resolve();
};