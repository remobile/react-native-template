'use strict';
const ReactNative = require('react-native');
const {
    AsyncStorage,
} = ReactNative;
const EventEmitter = require('EventEmitter');

const ITEM_NAME = 'APP_SETTING_MANAGER';

class Manager extends EventEmitter {
    constructor () {
        super();
        this.data = {};
        this.get();
    }
    get () {
        return new Promise(async(resolve, reject) => {
            let data = {};
            try {
                const infoStr = await AsyncStorage.getItem(ITEM_NAME);
                data = JSON.parse(infoStr);
            } catch (e) {
                data = {};
            }
            this.data = data || {};
            app.THEME_COLOR = this.data.themeColor || CONSTANTS.THEME_COLORS[0];
        });
    }
    set (data) {
        return new Promise(async(resolve, reject) => {
            this.data = data;
            await AsyncStorage.setItem(ITEM_NAME, JSON.stringify(data));
            resolve();
        });
    }
    setOnlyWifiUpload (flag) {
        const data = this.data;
        data.onlyWifiUpload = flag;
        this.set(data);
    }
    setThemeColor (color) {
        const data = this.data;
        data.themeColor = color;
        this.set(data);
        app.THEME_COLOR = color;
        app.update();
    }
    clear () {
        this.data = {};
        AsyncStorage.removeItem(ITEM_NAME);
    }
}

module.exports = new Manager();
