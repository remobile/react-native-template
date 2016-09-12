/*
* (The MIT License)
* Copyright (c) 2015-2016 YunJiang.Fang <42550564@qq.com>
* @providesModule AudioRecorder
* @flow-weak
*/
var exec = require('@remobile/react-native-cordova').exec;

var AudioRecorder = {
    record(successCallback, errorCallback, file) {
        exec(successCallback, errorCallback, "AudioRecorder", "record", [file||'']);
    },
    stop(successCallback, errorCallback) {
        exec(successCallback, errorCallback, "AudioRecorder", "stop", []);
    },
    play(file, successCallback, errorCallback) {
        exec(successCallback, errorCallback, "AudioRecorder", "playback", [file]);
    },
    playStop() {
        exec(null, null, "AudioRecorder", "playStop", []);
    },
}

module.exports = AudioRecorder;
