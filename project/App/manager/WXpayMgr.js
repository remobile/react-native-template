'use strict';

var {NativeAppEventEmitter, DeviceEventEmitter, Platform} = require('react-native');
var EventEmitter = require('EventEmitter');
var Wxpay = require('../native/index.js').WeixinPay;
var gEventEmitter = Platform.OS==="android"?DeviceEventEmitter:NativeAppEventEmitter;

class Manager extends EventEmitter {
	constructor() {
        super();
	}
	createWinCoinOrder(winCoinIDValue) {
		var param = {
			userID: app.personal.info.userID,
			winCoinID: winCoinIDValue,
		};
		POST(app.route.ROUTE_CREATE_WIN_CONIN_ORDER, param, this.createWinCoinOrderSuccess.bind(this), true);
	}
	createWinCoinOrderSuccess(data) {
		if (data.success) {
			this.getWXPayInfo(app.personal.info.userID,data.context.orderNo);
		} else {
			Toast(data.msg);
		}
	}
	getWXPayInfo(userID,orderNo) {
		var param = {
			userId:userID,
			orderNo:orderNo
		};
		this.orderNo = orderNo;
		POST(app.route.ROUTE_GET_WXPAY_INFO, param, this.getWXPayInfoInfoSuccess.bind(this));
	}
	getWXPayInfoInfoSuccess(data) {
		if (data.success) {
			this.doPay(data.context);
		} else {
			Toast(data.msg);
		}
	}
	useWeixinSuccess(info) {
		// this.emit('WXIPAY_RESULTS', {state: 'success', orderNo: this.orderNo})
	}
	useWeixinError(info) {
		this.emit('WXIPAY_RESULTS', {state: 'error', orderNo: this.orderNo,message:'调用微信界面失败'})
	}
	onPayResult(info) {
		if (this.subscription) {
			this.subscription.remove();
			this.subscription = null;
		}
		if (info.success=='true') {
			this.emit('WXIPAY_RESULTS', {state: 'success', orderNo: this.orderNo,message:info.errStr})
		} else {
			this.emit('WXIPAY_RESULTS', {state: 'error', orderNo: this.orderNo,message:info.errStr})
		}
	}
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
    doPay(data) {
		this.subscription = gEventEmitter.addListener('WEIXIN_PAY', (obj)=>{this.onPayResult(obj)});
        Wxpay.pay({
            appid: data.appid,
            noncestr: data.noncestr,
            package: data.package,
            partnerid: data.partnerid,
            prepayid: data.prepayid,
            timestamp: data.timestamp,
            sign: data.sign,
        },this.useWeixinSuccess.bind(this), this.useWeixinError.bind(this));
    }
}
module.exports = new Manager();
