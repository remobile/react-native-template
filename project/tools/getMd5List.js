const crypto = require('crypto');
const fs = require('fs');
const fetch = require('node-fetch');
const mapValues = require('lodash/mapValues');

function getFileMd5(filename) {
    return new Promise(async(resolve)=>{
        const rs = fs.createReadStream(filename);
        const hash = crypto.createHash('md5');
        rs.on('data', hash.update.bind(hash));

        rs.on('end', function () {
            resolve(hash.digest('hex'));
        });
    });
}
async function getMd5List(path, list) {
    const files = fs.readdirSync(path);
    for (const file of files) {
        const filepath = path+'/'+file;
        if (fs.statSync(filepath).isDirectory()) {
            await getMd5List(filepath, list);
        } else {
            list[filepath] = await getFileMd5(filepath);
        }
    }
    return list;
}
async function getMapList(platform, remote_md5_url) {
    let app = {};
    try {
        app = await fetch(remote_md5_url, {method: 'get'}).then((response) => response.json());
    } catch(e) {}
    const www = await getMd5List('./www', {});
    fs.writeFileSync('./'+platform+'_md5.json', JSON.stringify(www));
    return mapValues(www, (v, k)=>v===app[k]);
}
async function genNeedDownloadFiles(platform, remote_md5_url) {
    const list = await getMapList(platform, remote_md5_url);
    const needCopyFiles = [];
    for (const key in list) {
        if (list[key] && !/index.(ios|android).bundle/.test(key)) {
            needCopyFiles.push(key.replace(/^\.\/www\//, ''));
            console.log("needCopyFiles file:", key);
            fs.unlinkSync(key);
        }
    }
    console.log("needCopyFiles:", needCopyFiles);
    fs.writeFileSync('./www/needCopyFiles.json', JSON.stringify(needCopyFiles));
}

module.exports = genNeedDownloadFiles;
