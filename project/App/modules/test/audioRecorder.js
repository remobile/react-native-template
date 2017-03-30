'use strict';

const React = require('react');const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
} = ReactNative;

const Button = require('@remobile/react-native-simple-button');
const AudioRecorder = require('../../native/index.js').AudioRecorder;

const DocumentPath = '/Users/fang/work/test/';
const ITEM_NAME = 'AudioRecordeFiles';

module.exports = React.createClass({
    getOriginRecordFile () {
        const name = app.utils.dateFormat(new Date(), 'MM_dd_hh_mm_ss');
        return DocumentPath + name;
    },
    saveRecordFile (filename) {
        // mv this.recordFile filename
    },
    startRecord () {
        this.recordFile = this.getOriginRecordFile();
        AudioRecorder.record((result) => {
            console.log('success', result);
        }, (error) => {
            console.log('error', error);
        }, this.recordFile);
    },
    stopRecord () {
        AudioRecorder.stop((result) => {
            console.log('success', result);
        }, (error) => {
            console.log('error', error);
        });
    },
    play () {
        AudioRecorder.play('/sdcard/360/1.m4a', (result) => {
            console.log('success', result);
        }, (error) => {
            console.log('error', error);
        });
    },
    render () {
        return (
            <View style={styles.container}>
                <Button onPress={this.start}>开始录音</Button>
                <Button onPress={this.stop}>停止录音</Button>
                <Button onPress={this.play}>播放</Button>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-around',
        paddingVertical: 150,
    },
});
