'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Image,
    Text,
} = ReactNative;

var Button = require('@remobile/react-native-simple-button');
var SplashScreen = require('@remobile/react-native-splashscreen');
var QRCode = require('@remobile/react-native-qrcode-local-image');


module.exports = React.createClass({
    componentWillMount() {
        SplashScreen.hide();
    },
    getInitialState() {
        return {text: ''}
    },
    onPress() {
        QRCode.decode(!app.isandroid?'/Users/fang/Desktop/qr.png':'/sdcard/qr.png', (error, result)=>{
            this.setState({text: JSON.stringify({error, result})});
        });
    },
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.onPress}>测试</Button>
                <Text>
                    {this.state.text}
                </Text>
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
