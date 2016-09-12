'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    WebView,
} = ReactNative;

module.exports = React.createClass({
    statics: {
        leftButton: {handler: ()=>{app.scene.goBack()}},
    },
    componentWillMount() {
        app.toggleNavigationBar(true);
    },
    goBack() {
        app.navigator.pop();
    },
    render() {
        const {url} = this.props;
        return (
            <WebView
                style={styles.container}
                source={{uri: url}}
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
