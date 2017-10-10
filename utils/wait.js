const log = require('../helpers/log');

module.exports = (duration) => () => new Promise(resolve => {
    log(`Wait ${duration}ms...`);
    setTimeout(resolve, duration)
});