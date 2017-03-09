'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
} = ReactNative;

var Button = require('@remobile/react-native-simple-button');
var CacheModule = require('@remobile/react-native-cache-module');
var Module = require('@remobile/react-native-module');

module.exports = React.createClass({
    test () {
        CacheModule.getModulePath('http://localhost:3001/fang').then((path) => {
            Module.load(path, 'SimpleApp', { fang:1, yun:2 }, (result) => {
                Toast(JSON.stringify(result));
            });
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
