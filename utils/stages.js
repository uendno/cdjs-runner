const Promise = require('bluebird');
const options = require('../options');

/**
 * Define stages for the job
 * @type {function(*)}
 */
module.exports = (stages => {
    stages.forEach(stage => {
        stage();
    });

    process.send({
        type: 'stages',
        data: options.stageNames
    });

    return Promise.each(options.stageFns, (fn, index) => {
        process.send({
            type: 'stage-start',
            data: options.stageNames[index]
        });

        return fn()
            .then(() => {
                process.send({
                    type: 'stage-success',
                    data: options.stageNames[index]
                });
            })
            .catch(code => {
                process.send({
                    type: 'stage-failed',
                    data: options.stageNames[index]
                });

                process.exit(code);
            })
    })
});