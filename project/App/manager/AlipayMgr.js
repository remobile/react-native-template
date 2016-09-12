'use strict';

var EventEmitter = require('EventEmitter');
var Native = require('../native/index.js');

var winCoinPrice = 0.01;

class Manager extends EventEmitter {
	constructor() {
        super();
	}
    createWinCoinOrder(winCoinIDValue,price) {
		winCoinPrice = price;
        var param = {
            userID: app.personal.info.userID,
            winCoinID: winCoinIDValue,
        };
        POST(app.route.ROUTE_CREATE_WIN_CONIN_ORDER, param, this.createWinCoinOrderSuccess.bind(this), true);
    }
    createWinCoinOrderSuccess(data) {
        if (data.success) {
            this.getaliPayInfo("购买赢销币",data.context.orderNo,winCoinPrice);
        } else {
            Toast(data.msg);
        }
    }
    getaliPayInfo(subject,orderNo,price) {
        var param = {
        };
		this.subject = subject;
		this.tradeNo = orderNo;
		winCoinPrice = price;
        POST(app.route.ROUTE_GET_ALIPAY_INFO, param, this.getaliPayInfoSuccess.bind(this));
    }
    getaliPayInfoSuccess(data) {
        if (data.success) {
            var context = data.context;
            this.partner = context.alipayPID;
            this.seller = context.alipayName;
            this.privateKey = context.alipayPrivateKey ;
            this.notifyUrl = context.callbackUrl;
            this.doPay();
        } else {
            Toast(data.msg);
        }
    }
	paySuccess(info) {
		this.emit('ALIPAY_RESULTS', {state: 'success', orderNo: this.tradeNo,price:winCoinPrice})
	}
	payError(info) {
		this.emit('ALIPAY_RESULTS', {state: 'error', orderNo: this.tradeNo,price:winCoinPrice})
	}
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
            subject: this.subject,
            body: "赢销截拳道",
            price: winCoinPrice,
            notifyUrl: this.notifyUrl
        };
        Native.Alipay.pay(obj, this.paySuccess.bind(this),this.payError.bind(this));
    }
}
module.exports = new Manager();
