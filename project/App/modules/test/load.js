'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    Platform,
    NativeModules,
} = ReactNative;

const SplashScreen = require('@remobile/react-native-splashscreen');
const Button = require('@remobile/react-native-simple-button');
const Module = require('@remobile/react-native-module');

module.exports = React.createClass({
    componentWillMount () {
        SplashScreen.hide();
    },
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-around',
        paddingVertical: 150,
    },
});
