'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
} = ReactNative;

const Button = require('@remobile/react-native-simple-button');
const CacheModule = require('@remobile/react-native-cache-module');
const Module = require('@remobile/react-native-module');

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-around',
        paddingVertical: 150,
    },
});
