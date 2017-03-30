'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    Image,
    Text,
} = ReactNative;

const Button = require('@remobile/react-native-simple-button');
const QRCode = require('@remobile/react-native-qrcode-local-image');

module.exports = React.createClass({
    getInitialState () {
        return { text: '' };
    },
    onPress () {
        QRCode.decode('http://192.168.1.126:3000/qr.png', (error, result) => {
            this.setState({ text: JSON.stringify({ error, result }) });
        });
    },
    render () {
        return (
            <View style={styles.container}>
                <Button onPress={this.onPress}>测试</Button>
                <Text>
                    {this.state.text}
                </Text>
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
