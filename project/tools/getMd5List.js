const crypto = require('crypto');
const fs = require('fs');
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
async function getMapList(platform, distpath) {
    let app = {};
    try {
        app = JSON.parse(fs.readFileSync(distpath+'/'+platform+'_md5.json'));
    } catch(e) {}
    const www = await getMd5List('./www', {});
    fs.writeFileSync('./'+platform+'_md5.json', JSON.stringify(www));
    return mapValues(www, (v, k)=>v===app[k]);
}
async function genNeedDownloadFiles(platform, distpath) {
    const list = await getMapList(platform, distpath);
    console.log(list);
    const needCopyFiles = [];
    for (const key in list) {
        if (list[key]) {
            needCopyFiles.push(key.replace(/^\.\/www\//, ''));
            console.log("needCopyFiles file:", key);
            fs.unlinkSync(key);
        }
    }
    fs.writeFileSync('./www/needCopyFiles.json', JSON.stringify(needCopyFiles));
}

module.exports = genNeedDownloadFiles;
