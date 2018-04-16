const Promise = require('bluebird');
const options = require('../options');
const sendMessage = require('../helpers/sendMessage');
const log = require('../helpers/log');

module.exports = (stages => {
    stages.forEach(stage => {
        stage();
    });

    sendMessage({
        type: 'stages',
        data: options.stageNames
    });

    return Promise.each(options.stageFns, (fn, index) => {
        log('');
        log('\n-*----*----*----*----*----*----*----*----*----*----*-\nStage ' + (index + 1) + ': ' + options.stageNames[index] + '\n-*----*----*----*----*----*----*----*----*----*----*-\n\n');

        sendMessage({
            type: 'stage-start',
            data: options.stageNames[index]
        });

        return fn()
            .then(()=> {
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

                if (typeof code === 'number') {
                    process.exit(code);
                } else {
                    console.error(code);
                    process.exit(1);
                }
            })
    })
});