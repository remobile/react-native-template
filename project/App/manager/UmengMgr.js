'use strict';
var Umeng = require('../native/index.js').Umeng;
var EventEmitter = require('EventEmitter');

class Manager extends EventEmitter {
	constructor() {
        super();
	}
    doActionSheetShare(url,title,text,shareType,callback) {
        Umeng.shareWithActionSheet({
            url: 'https://itunes.apple.com/cn/app/ying-xiao-jie-quan-dao/id1096525384?mt=8',
            title: "贵阳赢销截拳道网络科技有限公司",
            text: text,
			shareType:shareType,
			sharePlatforms:"all"
        }, (result)=>{
			callback()
            console.log("success", result);
        });

    }
    doSingleShare(callback) {
        Umeng.shareSingle(Umeng.platforms.UMShareToWechatSession, {
            url: "http://www.baidu.com",
            title: "title",
            text: "text",
        }, (result)=>{
			callback()
            console.log("success", result);
        });

    }
}
module.exports = new Manager();
