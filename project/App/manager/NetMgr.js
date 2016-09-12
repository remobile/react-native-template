'use strict';
var React = require('react');var ReactNative = require('react-native');
var {
    Platform,
    NetInfo,
} = ReactNative;
var EventEmitter = require('EventEmitter');

class Manager extends EventEmitter {
    constructor() {
        super();
        this.info = {
            connect: false, //是否连接
            fee: false, //是否收费
        };
    }
    register() {
        NetInfo.addEventListener(
            'change',
            this._handleConnectionInfoChange
        );
        NetInfo.fetch().done((o) => {
            this.updateConnectionInfo(o);
        });
    }
    unregister() {
        NetInfo.removeEventListener(
            'change',
            this._handleConnectionInfoChange
        );
    }
    _handleConnectionInfoChange(o) {
        this.updateConnectionInfo(o);
    }
    updateConnectionInfo(o) {
        if (Platform.OS === 'android') {
            if (o === 'WIFI'|| o === 'ETHERNET' || o === 'DUMMY') {
                this.info = {connect: true, fee: false};
            } else if (/MOBILE.*/.test(o)) {
                this.info = {connect: true, fee: true};
            } else {
                this.info = {connect: false, fee: false};
            }
        } else {
            if (o === 'wifi') {
                this.info = {connect: true, fee: false};
            } else if (o === 'cell') {
                this.info = {connect: true, fee: true};
            } else {
                this.info = {connect: false, fee: false};
            }
        }
        app.mediaFileMgr.onNetChange(this.info);
    }
}

module.exports = new Manager();
