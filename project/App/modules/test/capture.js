'use strict';

var React = require('react');
var ReactNative = require('react-native');

var {
    StyleSheet,
    View,
    Text,
    Image,
} = ReactNative;

var SplashScreen = require('@remobile/react-native-splashscreen');
var Button = require('@remobile/react-native-simple-button');
var Capture = require('@remobile/react-native-capture');


module.exports = React.createClass({
    componentDidMount() {
        SplashScreen.hide();
    },
    getInitialState() {
        return {
            info: ''
        };
    },
    captureSuccess(mediaFiles) {
        this.setState({info: JSON.stringify(mediaFiles)});
    },
    captureError(error) {
        this.setState({info: JSON.stringify(error)});
    },
    doCapture() {
        Capture.captureVideo(this.captureSuccess, this.captureError, {limit:1});
    },
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.doCapture}>采集</Button>
                <Text>
                    {this.state.info}
                </Text>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
