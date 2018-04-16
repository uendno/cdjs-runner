const {stages, stage, cwd, wait, shell, DEFAULT_CWD, exec, describe, readEnvFile, env} = require('../index');

stages([
    stage('stage 1', () => {
        if (process.env.NODE_ENV === 'production') {
            return exec(shell('echo This is in production'))
                .then(code => {
                    console.log('Exit code: ' + code)
                })
        } else {
            return exec(shell('echo Just a test'))
                .then(code => {
                    console.log('Exit code: ' + code)
                })
        }
    }),

    stage('stage 2', () => exec(wait(2000))
        .then(shell('ls -a'))
        .then(code => {

        })
    ),

    stage('stage 3: test ENV', () => exec(readEnvFile('.env'))
        .then(() => {
            console.log(env('TEST'));
        })
    )
]);