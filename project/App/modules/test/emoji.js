'use strict';

const React = require('react');
const ReactNative = require('react-native');

const {
    StyleSheet,
    View,
    Text,
    Image,
    PanResponder,
} = ReactNative;

const SplashScreen = require('@remobile/react-native-splashscreen');
const Button = require('@remobile/react-native-simple-button');
const EmojiInputBox = require('../text/index.js');

module.exports = React.createClass({
    componentWillMount () {
        SplashScreen.hide();
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => true,
            onPanResponderGrant: (e, gestureState) => {
                this.emojiInputBox.hideKeyboard();
            },
        });
    },
    render () {
        return (
            <View style={styles.container}>
                <EmojiInputBox />
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 44,
        backgroundColor: 'white',
    },
});
