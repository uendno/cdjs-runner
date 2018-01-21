const Promise = require('bluebird');
const Path = require('path');
const glob = Promise.promisify(require('glob'));
const AdmZip = require('adm-zip');
const fs = require('fs');
const request = require('request-promise');

module.exports = (input) => () => {

    let patterns = input;

    if (!Array.isArray(input)) {
        patterns = [input];
    }

    let files = [];

    const promises = patterns.map(pattern => {
        return glob(pattern)
            .then(result => {
                files = files.concat(result)
            })
    });

    return Promise.all(promises)
        .then(() => {
            const zip = new AdmZip();

            files.forEach(path => {
                const p = fs.statSync(path);
                if (p.isFile()) {
                    zip.addLocalFile(path, Path.dirname(path));
                } else if (p.isDirectory()) {
                    zip.addLocalFolder(path, path);
                }
            });

            return new Promise((resolve, reject) => {

                const zipFile = Date.now().toString() + '.zip';

                zip.writeZip(zipFile, (error) => {
                    if (error) return reject(error);
                    return resolve(zipFile);
                });
            })
        })
        .then(zipFile => {
            return request.post({
                url: process.env.CDJS_UPLOAD_URL,
                formData: {
                    file: fs.createReadStream('./' + zipFile)
                },
                headers: {
                    'Authorization': process.env.CDJS_ACCESS_TOKEN
                }
            })
        })
};