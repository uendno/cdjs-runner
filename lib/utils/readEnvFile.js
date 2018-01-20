const dotenv = require('dotenv');
const fs = require('fs-extra');
const options = require('../options');
const log = require('../helpers/log');

module.exports = (file) => () => {
    log('Read environment variables from file: ' + file);

    return fs.readFile(file)
        .then(content => {
            options.env = dotenv.parse(content);
            console.log(options.env);
        });
};