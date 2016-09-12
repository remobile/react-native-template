'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
} = ReactNative;

var Native = require('../../native/index.js');
var {Button} = COMPONENTS;

module.exports = React.createClass({
    createWinCoinOrder() {
        var param = {
            userID: "56e656d10cf2b97fb6c3b779",
            winCoinID: "56e6314c0cf2a703c3fe7346",
        };
        POST(app.route.ROUTE_CREATE_WIN_CONIN_ORDER, param, this.createWinCoinOrderSuccess);
    },
    createWinCoinOrderSuccess(data) {
        if (data.success) {
            this.tradeNo = data.context.orderNo;
            this.getaliPayInfo();
        } else {
            console.log(data.msg);
        }
    },
    getaliPayInfo() {
        var param = {
        };
        POST(app.route.ROUTE_GET_ALIPAY_INFO, param, this.getaliPayInfoSuccess);
    },
    getaliPayInfoSuccess(data) {
        if (data.success) {
            var context = data.context;
            this.partner = context.alipayPID;
            this.seller = context.alipayName;
            this.privateKey = context.alipayPrivateKey ;
            this.notifyUrl = context.callbackUrl;
            this.doPay();
        } else {
            console.log(data.msg);
        }
    },
    /*
    * seller 你的商户支付宝帐号
    * partner 你的商户PID, 签约后，支付宝会为每个商户分配一个唯一的 parnter 和 seller。
    * privateKey 你生成的private key
    * tradeNo 交易号
    * subject 这个字段会显示在支付宝付款的页面
    * body 订单详情，没找到会显示哪里
    * price 价格，支持两位小数
    * function(successResults){} 是成功之后的回调函数
    * function(errorResults){} 是失败之后的回调函数
    */
    doPay() {
        var obj = {
            partner: this.partner,
            seller: this.seller,
            privateKey: this.privateKey,
        	tradeNo: this.tradeNo,
        	subject: "购买赢销币",
        	body: "我是测试内容",
        	price: 0.01,
        	notifyUrl: this.notifyUrl
        };
        console.log(obj);
        Native.Alipay.pay(obj, function(results){console.log('success:', results)}, function(results){'error:', console.log(results)});
    },
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.createWinCoinOrder}>支付宝支付</Button>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-around',
        paddingVertical: 150,
    },
});
