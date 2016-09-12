/*
* (The MIT License)
* Copyright (c) 2015-2016 YunJiang.Fang <42550564@qq.com>
* @providesModule WeixinPay
* @flow-weak
*/
var exec = require('@remobile/react-native-cordova').exec;

var WeixinPay = {
  pay(json, successFn, failureFn) {
    exec(successFn, failureFn, 'WeixinPay', 'payment', [json]);
  }
}

module.exports = WeixinPay;
