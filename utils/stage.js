const options = require('../options');

module.exports = (stageName, fn) => () => {
    options.stageNames.push(stageName);
    options.stageFns.push(fn);
};