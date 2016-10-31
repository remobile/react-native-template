'use strict';

var React = require('react');
var ReactNative = require('react-native');

var {
    StyleSheet,
    View,
    Text,
    Image,
    PanResponder,
} = ReactNative;

var MessageBox = require('./MessageBox.js');
var SplashScreen = require('@remobile/react-native-splashscreen');

module.exports = React.createClass({
    componentWillMount() {
        SplashScreen.hide();
    },
    render() {
        return (
            <View style={styles.container}>
                <MessageBox left style={styles.message}>
                    <Text>还好吧！！sadfsadfsadfjhasdkjfhsadkjfhsadkjfhsadkjfhsadkjfhsadkjfhsadkjfhkj</Text>
                    <Text>还好吧！！</Text>
                    <Text>还好吧！！</Text>
                    <Text>还好吧！！</Text>
                    <Text>还好吧！！</Text>
                    <Text>还好吧！！</Text>
                    <Text>还好吧！！</Text>
                    <Text>还好吧！！</Text>
                    <Text>还好吧！！</Text>
                </MessageBox>
                <MessageBox backgroundColor='#A6DC3E' style={styles.message}>
                    <Text>还好吧！！sadfsadfsadfjhasdkjfhsadkjfhsadkjfhsadkjfhsadkjfhsadkjfhsadkjfhkj</Text>
                    <Text>还好吧！！</Text>
                    <Text>还好吧！！</Text>
                    <Text>还好吧！！</Text>
                    <Text>还好吧！！</Text>
                    <Text>还好吧！！</Text>
                    <Text>还好吧！！</Text>
                    <Text>还好吧！！</Text>
                    <Text>还好吧！！</Text>
                </MessageBox>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        width: sr.w*2/3,
    },
});
