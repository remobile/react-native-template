'use strict';
const ReactNative = require('react-native');
const {
    AsyncStorage,
} = ReactNative;
const EventEmitter = require('EventEmitter');
const ITEM_NAME = 'personalInfo';
const NEED_LOGIN_ITEM_NAME = 'personalInfoNeedLogin';

class Manager extends EventEmitter {
    constructor () {
        super();
        this.get();
    }
    get () {
        return new Promise(async(resolve, reject) => {
            let info;
            try {
                const needLogin = await AsyncStorage.getItem(NEED_LOGIN_ITEM_NAME);
                this.needLogin = needLogin !== 'false';
                const infoStr = await AsyncStorage.getItem(ITEM_NAME);
                info = JSON.parse(infoStr);
            } catch (e) {
                this.needLogin = true;
            }
            this.info = info || {};
            this.needLogin = this.needLogin || !info;
            this.initialized = true;
        });
    }
    set (info) {
        this.info = info;
        return new Promise(async(resolve, reject) => {
            await AsyncStorage.setItem(ITEM_NAME, JSON.stringify(info));
            resolve();
        });
    }
    setUserHead (head) {
        this.emit('USER_HEAD_CHANGE_EVENT', { head:head });
    }
    setNeedLogin (flag) {
        this.needLogin = flag;
        AsyncStorage.setItem(NEED_LOGIN_ITEM_NAME, flag + '');
    }
}

module.exports = new Manager();
