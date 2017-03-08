'use strict';
var React = require('react');
var ReactNative = require('react-native');
var {
    AsyncStorage,
} = ReactNative;
var EventEmitter = require('EventEmitter');

const ITEM_NAME = "NEED_SHOW_SPLASH";
const Update = require('@remobile/react-native-update');
const UpdateInfoBox = require('../modules/update/UpdateInfoBox');

class Manager extends EventEmitter {
	constructor() {
        super();
        this.needShowSplash = true;
        this.getNeedShowSplash();
	}
    checkUpdate() {
        Update.checkVersion({
            versionUrl: app.route.ROUTE_VERSION_INFO_URL,
            iosAppId: CONSTANTS.IOS_APPID,
        }).then((options)=>{
            if (options && options.newVersion) {
                app.showModal(<UpdateInfoBox options={options} />, {backgroundColor:'rgba(0, 0, 0, 0.6)'})
            }
        })
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
            this.initialized = true;
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
