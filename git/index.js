const simpleGit = require('simple-git/promise');
const fs = require('fs');
const Url = require('url');
const log = require('../helpers/log');

const cwd = process.cwd();
const gitCli = simpleGit(cwd);

exports.pull = () => {
    log('Git pulling...');
    return gitCli.pull();
};

exports.updateSubModule = () => {

    if (fs.existsSync(cwd + "/.gitmodules")) {
        log('Updating submodules...');
        return gitCli.raw(['config', '--file', '.gitmodules', '--get-regexp', 'url'])
            .then(result => {
                const submodules = result.split("\n");
                const promises = [];

                submodules.forEach(submodule => {
                    const parts = submodule.split(" ");

                    if (parts.length < 2) return;

                    log('Configuring ' + parts[0]);

                    const url = Url.parse(parts[1]);
                    url.auth = process.env.CDJS_GIT_USERNAME + ':' + process.env.CDJS_GIT_ACCESS_TOKEN;

                    const formattedUrl = Url.format(url);

                    const promise = gitCli.addConfig(parts[0], formattedUrl);
                    promises.push(promise);
                });

                return Promise.all(promises);
            })
            .then(() => {
                log('Updating submodules...');
                return gitCli.submoduleUpdate(["--init", "--remote", "--recursive"]);
            })
    } else {
        return Promise.resolve();
    }
};