'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    AsyncStorage,
    WebView,
} = ReactNative;


var Button = require('@remobile/react-native-simple-button');


var OverLayer = React.createClass({
    render() {
        return (
            <View style={styles.overlayer}>
            </View>
        );
    }
});

module.exports = React.createClass({
    getDefaultProps () {
        return {
        };
    },

    getInitialState() {
        return {
            show: true,
        };
    },
    render() {
        return (
            <View style={styles.container}>
                {this.state.show &&
                    <OverLayer />
                }
                <WebView
                    style={styles.webview}
                    url={'https://www.baidu.com'}
                    scalesPageToFit={this.state.scalesPageToFit}
                    />

            </View>
        );
    }
});


var styles = StyleSheet.create({
    container:{

    },
    webview: {
        position:'absolute',
        top:25,
        left:25,
        width: sr.w-50,
        height: sr.h-120,
    },
    overlayer: {
        position:'absolute',
        top:0,
        left:0,
        width: sr.w,
        height: sr.h,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    }
});
