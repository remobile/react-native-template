'use strict';
var React = require('react');
var ReactNative = require('react-native');
var {
    Platform,
    NetInfo,
} = ReactNative;
var EventEmitter = require('EventEmitter');

class Manager extends EventEmitter {
    constructor () {
        super();
        this._init = false;
        this.info = {
            connect: false, // 是否连接
            fee: false, //是否收费
        };
    }
    register () {
        if (!this._init) {
            this._init = true;
            NetInfo.addEventListener(
                'change',
                this._handleConnectionInfoChange.bind(this)
            );
        }
    }
    unregister () {
        NetInfo.removeEventListener(
            'change',
            this._handleConnectionInfoChange.bind(this)
        );
        this._init = false;
    }
    _handleConnectionInfoChange (o) {
        this.updateConnectionInfo(o);
    }
    updateConnectionInfo (o) {
        if (Platform.OS === 'android') {
            if (o === 'WIFI' || o === 'ETHERNET' || o === 'DUMMY') {
                this.info = { connect: true, fee: false };
            } else if (/MOBILE.*/.test(o)) {
                this.info = { connect: true, fee: true };
            } else {
                this.info = { connect: false, fee: false };
            }
        } else {
            if (o === 'wifi') {
                this.info = { connect: true, fee: false };
            } else if (o === 'cell') {
                this.info = { connect: true, fee: true };
            } else {
                this.info = { connect: false, fee: false };
            }
        }
        app.connect = this.info.connect;
        if (!app.connect) {
            Toast('当前设备已离线，请检查您的网络是否可用');
        }
    }
}

module.exports = new Manager();
