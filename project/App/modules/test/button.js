'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
} = ReactNative;

var SplashScreen = require('@remobile/react-native-splashscreen');
var Button = require('@remobile/react-native-simple-button');

module.exports = React.createClass({
    componentWillMount() {
        SplashScreen.hide();
    },
    async test() {
        let response = await fetch('https://facebook.github.io/react-native/movies.json');
        let responseJson = await response.json();
        console.log(responseJson);
    },
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.test}>测试</Button>
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
