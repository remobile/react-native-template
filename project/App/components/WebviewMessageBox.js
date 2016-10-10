'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    WebView,
} = ReactNative;

var Button = require('./Button.js');

module.exports = React.createClass({
    render() {
        return (
            <View style={styles.overlayContainer}>
                <View style={[styles.container, {top: sr.totalNavHeight+sr.statusBarHeight}]}>
                    <WebView
                        style={styles.webview}
                        source={{uri:this.props.webAddress}}
                        scalesPageToFit={true}
                        />
                    <Button
                        onPress={app.closeModal}
                        style={[styles.contentButton, {backgroundColor:app.THEME_COLOR}]}>返回</Button>
                </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    overlayContainer: {
        position:'absolute',
        top: 0,
        bottom: 0,
        left:0,
        right: 0,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        width:sr.w*5/6,
        height:sr.h*4/5,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        borderRadius:10,
        position: 'absolute',
        left: sr.w*1/12,
    },
    webview: {
        width:sr.w*5/6,
        height:sr.h*4/5-50,
    },
    contentButton: {
        width:sr.w*5/6,
        height:50,
        borderRadius:0,
    },
});
