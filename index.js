module.exports = {
    git: require('./lib/utils/git'),
    shell: require('./lib/utils/shell'),
    wait: require('./lib/utils/wait'),
    cwd: require('./lib/utils/cwd'),
    stage: require('./lib/utils/stage'),
    stages: require('./lib/utils/stages'),
    readEnvFile: require('./lib/utils/readEnvFile'),
    setEnv: require('./lib/utils/setEnv'),
    exec: (fn) => fn(),
    DEFAULT_CWD: null,
    env: require('./lib/utils/env'),
    upload: require('./lib/utils/upload')
};