'use strict';
var ReactNative = require('react-native');
var {
    AsyncStorage,
} = ReactNative;
var EventEmitter = require('EventEmitter');

const ITEM_NAME = "NEED_SHOW_SPLASH";

class Manager extends EventEmitter {
	constructor() {
        super();
        this.needShowSplash = true;
        this.getNeedShowSplash();
	}
    getNeedShowSplash() {
        return new Promise(async(resolve, reject)=>{
            var needShowSplash;
            try {
                var infoStr = await AsyncStorage.getItem(ITEM_NAME);
                needShowSplash = JSON.parse(infoStr);

            } catch(e) {
            }
            this.needShowSplash = needShowSplash==null ? true : needShowSplash;
        });
    }
    setNeedShowSplash(needShowSplash) {
        return new Promise(async(resolve, reject)=>{
            this.needShowSplash = needShowSplash;
            await AsyncStorage.setItem(ITEM_NAME, JSON.stringify(needShowSplash));
            resolve();
        });
    }
    clear() {
        this.needShowSplash = null;
        AsyncStorage.removeItem(ITEM_NAME);
    }
}

module.exports = new Manager();
