'use strict';
var React = require('react');
var ReactNative = require('react-native');
var {
    Platform,
    NetInfo,
} = ReactNative;
var EventEmitter = require('EventEmitter');
import JPush , {JpushEventReceiveMessage, JpushEventOpenMessage} from 'react-native-jpush';
const
MESSAGE_TYPE_SYSTEM_NOTICE = 0,
MESSAGE_TYPE_SPECOPS_NEW_VIDEO = 1,
MESSAGE_TYPE_SPECOPS_NEW_LIVE = 2,
MESSAGE_TYPE_SPECOPS_NEW_ROOM = 3;

class Manager extends EventEmitter {
    constructor() {
        super();
    }
    register() {
        if (!this.pushlisteners) {
            JPush.requestPermissions();
            this.pushlisteners = [
                JPush.addEventListener(JpushEventReceiveMessage, this.onReceiveMessage.bind(this)),
                JPush.addEventListener(JpushEventOpenMessage, this.onOpenMessage.bind(this)),
            ]
        }
    }
    unregister() {
        if (this.pushlisteners) {
            this.pushlisteners.forEach(listener=> {
                JPush.removeEventListener(listener);
            });
        }
    }
    getMessageText(message) {
        let text = '';
        if (Platform.OS==="android" && message._data) {
            text = message._data['cn.jpush.android.ALERT'];
        } else if (Platform.OS==="ios" && message._data && message._data.aps) {
            text = message._data.aps.alert;
        }
        return text;
    }
    getMessageType(message) {
        let type = '';
        if (Platform.OS==="android" && message._data && message._data['cn.jpush.android.EXTRA']) {
            try {
                type= JSON.parse(message._data['cn.jpush.android.EXTRA']).type;
            } catch (e) {}
        } else if (Platform.OS==="ios" && message._data) {
            type = message._data.type;
        }
        return type*1;
    }
    onReceiveMessage(message) {
        console.log('onReceiveMessage', message);
        const text = this.getMessageText(message);
        if (text && typeof text==='string') {
            Toast(text);
        }
    }
    onOpenMessage(message) {
        console.log('onOpenMessage', message);
        app.utils.until(
            ()=>app.hasLoadMainPage,
            (cb)=>setTimeout(cb, 1000),
            ()=>this.doOpenMessage(message)
        );
    }
    doOpenMessage(message) {
        const type = this.getMessageType(message);
        switch (type) {
            case MESSAGE_TYPE_SYSTEM_NOTICE:
                app.navigator.push({
                    component: require('../modules/login/ForgetPassword.js')
                });
                break;
            case MESSAGE_TYPE_SPECOPS_NEW_VIDEO:
                app.navigator.popToTop();
                app.showMainScene(4);
                break;
            case MESSAGE_TYPE_SPECOPS_NEW_LIVE:
                app.navigator.popToTop();
                app.showMainScene(4);
                break;
            case MESSAGE_TYPE_SPECOPS_NEW_ROOM:
                app.navigator.popToTop();
                app.showMainScene(2);
                break;
            default:;
        }
    }
}

module.exports = new Manager();
