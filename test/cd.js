const {stages, stage, steps, cwd, wait, shell, DEFAULT_CWD, exec} = require('../index');

stages([
    stage('stage 1', () => {
        return steps()
            .then(wait(1000))
            .then(cwd('/home'))
            .then(shell("asdasd $PWD"))
            .then(wait(500))
            .then(() => {
                if (process.env.NODE_ENV === 'production') {
                    return exec(shell('echo This is in production'))
                } else {
                    return exec(shell('echo Just a test'))
                }
            })
            .then(cwd(DEFAULT_CWD))
            .then(shell("echo $PWD"))
    }),

    stage('stage 2', () => {
        return steps()
            .then(wait(2000))
            .then(shell('cd ../ && ls'))
            .then(shell('docker ps -a'))
    })
]);