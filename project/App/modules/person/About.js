'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    WebView,
} = ReactNative;

module.exports = React.createClass({
    statics: {
        title: '软件许可协议',
    },
    render() {
        return (
            <WebView
                style={styles.container}
                source={{uri: app.route.ROUTE_ABOUT_PAGE}}
                scalesPageToFit={true}
                />
        );
    }
});

var styles = StyleSheet.create({
    container:{
        flex: 1,
    },
});
