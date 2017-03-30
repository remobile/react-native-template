'use strict';

const Des = require('@remobile/react-native-des');
const FileUpload = require('NativeModules').FileUpload;
const KEY = CONSTANTS.DES_KEY;

function MULTIUPLOAD (files, url, parameter, onprogress, success, failed, wait) {
    console.log('send:', url, parameter);
    const obj = {
        uploadUrl: url,
        method: 'POST', // default 'POST',support 'POST' and 'PUT'
        headers: {
            'Accept': 'application/json',
        },
        fields: {
        },
        files: files,
    };
    if (typeof failed === 'boolean') {
        wait = failed;
        failed = null;
    }
    if (wait) {
        app.showProgressHud();
    }
    Des.encrypt(JSON.stringify(parameter), KEY, function (base64) {
        const param = base64;
        FileUpload.upload(obj, function (err, result) {
            console.log('upload:', obj, err, result);
            const base64 = result.data;
            Des.decrypt(base64, KEY, function (jsonString) {
                let json = {};
                try {
                    json = JSON.parse(jsonString);
                } catch (error) {
                    if (!failed || !failed(error)) {
                        Toast('数据解析错误');
                        if (wait) {
                            app.dismissProgressHud();
                        }
                    }
                }
                console.log('recv:', json);
                app.dismissProgressHud();
                success(json);
            }, function () {
                Toast('数据解密错误');
            });
        });
    }, function () {
        Toast('数据加密错误');
    });
}

module.exports = MULTIUPLOAD;
