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

var SplashScreen = require('@remobile/react-native-splashscreen');
var Button = require('@remobile/react-native-simple-button');
var EmojiInputBox = require('../text/index.js');


module.exports = React.createClass({
    componentWillMount() {
        SplashScreen.hide();
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => true,
            onPanResponderGrant: (e, gestureState) => {
                this.emojiInputBox.hideKeyboard();
            },
        });
    },
    render() {
        return (
            <View style={styles.container}>
                <EmojiInputBox />
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 44,
        backgroundColor: 'white',
    },
});
