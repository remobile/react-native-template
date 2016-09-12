/*
* (The MIT License)
* Copyright (c) 2015-2016 YunJiang.Fang <42550564@qq.com>
* @providesModule Alipay
* @flow-weak
*/

var cordova = require('@remobile/react-native-cordova');

module.exports = {
    pay(paymentInfo, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "AliPay", "pay", [paymentInfo]);
    }
};
