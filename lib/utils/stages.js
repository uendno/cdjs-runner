const Promise = require('bluebird');
const options = require('../options');
const sendMessage = require('../helpers/sendMessage');

/**
 * Define stages for the job
 * @type {function(*)}
 */
module.exports = (stages => {
    stages.forEach(stage => {
        stage();
    });

    sendMessage({
        type: 'stages',
        data: options.stageNames
    });

    return Promise.each(options.stageFns, (fn, index) => {
        sendMessage({
            type: 'stage-start',
            data: options.stageNames[index]
        });

        return fn()
            .then(() => {
                sendMessage({
                    type: 'stage-success',
                    data: options.stageNames[index]
                });
            })
            .catch(code => {
                sendMessage({
                    type: 'stage-failed',
                    data: options.stageNames[index]
                });

                process.exit(code);
            })
    })
});