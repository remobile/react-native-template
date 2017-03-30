'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    WebView,
} = ReactNative;

const SplashScreen = require('@remobile/react-native-splashscreen');
const Button = require('@remobile/react-native-simple-button');
const fs = require('react-native-fs');

module.exports = React.createClass({
    componentWillMount () {
        SplashScreen.hide();
    },
    test () {
        this.webview.postMessage('I am from react');
        this.webview.postMessage('I am from react1');
    },
    onMessage (e) {
        console.log(e.nativeEvent.data);
    },
    render () {
        return (
            <View style={{ flex: 1, paddingTop: 60 }}>
                <Button onPress={this.test}>测试</Button>
                <WebView
                    ref={(ref) => { this.webview = ref; }}
                    onMessage={this.onMessage}
                    javaScriptEnabled
                    source={{ html: `
                        <script>
                            document.addEventListener('message', function(e) {
                                window.postMessage(e.data + '[back]');
                                window.postMessage(e.data + '[back]');
                                window.postMessage(e.data + '[back]');
                            });
                        </script>` }}
                    />
            </View>
        );
    },
});
