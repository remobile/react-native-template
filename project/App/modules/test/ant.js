'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Image,
} = ReactNative;

// var Button = require('@remobile/react-native-simple-button');
var SplashScreen = require('@remobile/react-native-splashscreen');
import Button from 'antd-mobile/lib/button';


module.exports = React.createClass({
    componentWillMount() {
        SplashScreen.hide();
    },
    getInitialState() {
        return {index: 1}
    },
    render() {
        return (
            <View style={styles.container}>
                <Button style={styles.button} disabled={false}>Start</Button>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        backgroundColor: 'red',
    },
    button: {
        backgroundColor: 'blue',
        width: sr.mw,
        borderWidth: 0,
    }
});
