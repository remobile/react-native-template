'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
} = ReactNative;

var Button = require('@remobile/react-native-simple-button');
var Wxpay = require('../../native/index.js').WeixinPay;



module.exports = React.createClass({
    /*
    * 注：订单总金额，只能为整数，单位为【分】，参数值不能带小数。
    * appid: 公众账号ID
    * noncestr: 随机字符串
    * package: 扩展字段
    * partnerid: 商户号
    * prepayid: 预支付交易会话ID
    * timestamp: 时间戳
    * sign: 签名
    */
    doPay() {
        Wxpay.pay({
            appid: "wx18d0597c9febcd0d",
            noncestr: "6E19AACCBF1947C6B4174002AA4A0880",
            package: "Sign=WXPay",
            partnerid: "1319502301",
            prepayid: "wx201604261017572078a543080024071363",
            timestamp:"1461637077",
            sign: "D33D5A6FAE941D5253DF998247B1C75A",
        }, function(results){console.log('success:', results)}, function(results){'error:', console.log(results)});
    },
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.doPay}>微信支付</Button>
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
