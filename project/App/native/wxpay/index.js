var exec = require('@remobile/react-native-cordova').exec;

var WeixinPay = {
  pay(json, successFn, failureFn) {
    exec(successFn, failureFn, 'WeixinPay', 'payment', [json]);
  }
}

module.exports = WeixinPay;
