module.exports = {
    git: require('./utils/git'),
    shell: require('./utils/shell'),
    wait: require('./utils/wait'),
    cwd: require('./utils/cwd'),
    stage: require('./utils/stage'),
    stages:require('./utils/stages'),
    steps: require('./utils/steps'),
    exec: (fn) => fn(),

    DEFAULT_CWD: null
};