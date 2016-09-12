'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
} = ReactNative;

var Button = require('@remobile/react-native-simple-button');
var AudioRecorder = require('../../native/index.js').AudioRecorder;

var DocumentPath = "/Users/fang/work/test/";
const ITEM_NAME = "AudioRecordeFiles";

module.exports = React.createClass({
    getOriginRecordFile() {
        var name = app.utils.dateFormat(new Date(), 'MM_dd_hh_mm_ss')
        return DocumentPath+name;
    },
    saveRecordFile(filename) {
        //mv this.recordFile filename
    },
    startRecord() {
        this.recordFile = getOriginRecordFile();
        AudioRecorder.record((result)=>{
            console.log("success", result);
        }, (error)=>{
            console.log("error", error);
        }, this.recordFile);
    },
    stopRecord() {
        AudioRecorder.stop((result)=>{
            console.log("success", result);
        }, (error)=>{
            console.log("error", error);
        });
    },
    play() {
        AudioRecorder.play("/sdcard/360/1.m4a", (result)=>{
            console.log("success", result);
        }, (error)=>{
            console.log("error", error);
        });
    },
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.start}>开始录音</Button>
                <Button onPress={this.stop}>停止录音</Button>
                <Button onPress={this.play}>播放</Button>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-around',
        paddingVertical: 150,
    },
});
