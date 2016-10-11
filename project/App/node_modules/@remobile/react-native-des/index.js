'use strict';

const ENABLE = true;
var ReactNative = require('react-native');
var {
    NativeModules
} = ReactNative;

module.exports = ENABLE ? NativeModules.Des : {
    encrypt: (text, key, callback)=>callback(text),
    decrypt: (code, key, callback)=>callback(code),
};
