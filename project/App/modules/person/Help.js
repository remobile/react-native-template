'use strict';

const React = require('react');const ReactNative = require('react-native');
const {
    StyleSheet,
    WebView,
} = ReactNative;

module.exports = React.createClass({
    statics: {
        title: '软件许可协议',
    },
    render () {
        return (
            <WebView
                style={styles.container}
                source={{ uri:app.route.ROUTE_SOFTWARE_LICENSE }}
                scalesPageToFit
                />
        );
    },
});

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
});
