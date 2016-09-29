'use strict';

var Des = require('@remobile/react-native-des');
var FileTransfer = require('@remobile/react-native-file-transfer');
var KEY = CONSTANTS.DES_KEY;

function UPLOAD(filePath, url, options, onprogress, success, failed, wait) {
    if (typeof failed === 'boolean') {
        wait = failed;
        failed = null;
    }
    if (wait) {
        app.showProgressHud();
    }
    var parameter = options.params;
    Des.encrypt(parameter, KEY, function(base64) {
        options.params = base64;
        var fileTransfer = new FileTransfer();
        fileTransfer.onprogress = onprogress;
        fileTransfer.upload(filePath, url, (res)=>{
            var base64 = res.response;
            Des.decrypt(base64, KEY, function(jsonString) {
                var json = {};
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
                console.log("recv:", json);
                app.dismissProgressHud();
                success(json);
            }, function() {
                Toast('数据解密错误');
            });
        }, (err)=>{
            if (!failed || !failed(err)) {
                Toast('上传失败');
                if (wait) {
                    app.dismissProgressHud();
                }
			}
        }, options);
    }, function() {
        Toast('数据加密错误');
    });
}

module.exports = UPLOAD;
