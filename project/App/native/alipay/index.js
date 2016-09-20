var cordova = require('@remobile/react-native-cordova');

module.exports = {
    pay(paymentInfo, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "AliPay", "pay", [paymentInfo]);
    }
};
