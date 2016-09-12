'use strict';
var ReactNative = require('react-native');
var {
    AsyncStorage,
} = ReactNative;
var EventEmitter = require('EventEmitter');

const ITEM_NAME = "LOGIN_HISTORY_LIST";

class Manager extends EventEmitter {
	constructor() {
        super();
        this.list = [];
        this.get();
	}
    get() {
        return new Promise(async(resolve, reject)=>{
            var list = [];
            try {
                var infoStr = await AsyncStorage.getItem(ITEM_NAME);
                list = JSON.parse(infoStr);
            } catch(e) {
            }
            this.list = list||[];
        });
    }
    set(list) {
        return new Promise(async(resolve, reject)=>{
            this.list = list;
            await AsyncStorage.setItem(ITEM_NAME, JSON.stringify(list));
            resolve();
        });
    }
    savePhone(phone) {
        var list = this.list;
        if (_.includes(list, phone)) {
            list = _.without(list, phone);
        }
        list.unshift(phone);
        this.set(list);
    }
    clear() {
        this.list = [];
        AsyncStorage.removeItem(ITEM_NAME);
    }
}

module.exports = new Manager();
