'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Platform,
    NativeModules,
} = ReactNative;

var Button = require('@remobile/react-native-simple-button');
var Module = require('@remobile/react-native-module');

module.exports = React.createClass({
    test () {
        const url = Platform.OS === 'android' ?
         '/sdcard/www/index.android.bundle' :
         '/Users/fang/rn/react-native-template/moduleLoad/www/ios/index.ios.bundle';
        Module.load(url, 'SimpleApp', { fang:1, yun:2 }, (result) => {
            Toast(JSON.stringify(result));
        });
    },
    render () {
        return (
            <View style={styles.container}>
                <Button onPress={this.test}>测试</Button>
            </View>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-around',
        paddingVertical: 150,
    },
});
