module.exports = {
    git: require('./lib/utils/git'),
    shell: require('./lib/utils/shell'),
    wait: require('./lib/utils/wait'),
    cwd: require('./lib/utils/cwd'),
    stage: require('./lib/utils/stage'),
    stages:require('./lib/utils/stages'),
    steps: require('./lib/utils/steps'),
    exec: (fn) => fn(),

    DEFAULT_CWD: null
};