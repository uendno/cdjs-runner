const Promise = require('bluebird');
const options = require('../options');
const sendMessage = require('../helpers/sendMessage');
const log = require('../helpers/log');

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

    let lastResult;

    return Promise.each(options.stageFns, (fn, index) => {
        log('');
        log('\n-*----*----*----*----*----*----*----*----*----*----*-\nStage ' + (index + 1) + ': ' + options.stageNames[index] + '\n-*----*----*----*----*----*----*----*----*----*----*-\n\n');

        sendMessage({
            type: 'stage-start',
            data: options.stageNames[index]
        });

        return fn(lastResult)
            .then(result => {
                lastResult = result;

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