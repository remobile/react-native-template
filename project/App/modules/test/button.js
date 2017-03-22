'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    WebView,
} = ReactNative;

var SplashScreen = require('@remobile/react-native-splashscreen');
var Button = require('@remobile/react-native-simple-button');
var fs = require('react-native-fs');

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
