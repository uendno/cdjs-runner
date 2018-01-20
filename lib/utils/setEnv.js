const options = require('../options');

module.exports = (key, value) => () => {
    options.env[key] = value;
    return Promise.resolve();
};