const options = require('../options');

module.exports = (key) => {
    return options.env[key];
};