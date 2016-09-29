'use strict';

var Des = require('@remobile/react-native-des');
var FileUpload = require('NativeModules').FileUpload;
var KEY = CONSTANTS.DES_KEY;

function MULTIUPLOAD(files, url, parameter, onprogress, success, failed, wait) {
    console.log("send:", url, parameter);
    var obj = {
        uploadUrl: url,
        method: 'POST', // default 'POST',support 'POST' and 'PUT'
        headers: {
         'Accept': 'application/json',
        },
        fields: {
        },
        files: files
    };
    if (typeof failed === 'boolean') {
        wait = failed;
        failed = null;
    }
    if (wait) {
        app.showProgressHud();
    }
    Des.encrypt(JSON.stringify(parameter), KEY, function(base64) {
        var param = base64;
        FileUpload.upload(obj, function(err, result) {
          console.log('upload:', obj,err, result);
          var base64 = result.data;
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
         });
      }, function() {
          Toast('数据加密错误');
      });
}

module.exports = MULTIUPLOAD;
