'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
} = ReactNative;

var resolveAssetSource = require('resolveAssetSource');
var Cocos2dx = require('./xx');
// var Cocos2dx = require('@remobile/react-native-cocos2dx');
var SplashScreen = require('@remobile/react-native-splashscreen');
var resource = require('./resource.js');
var render = require('./render.js');

module.exports = React.createClass({
    componentWillMount() {
        SplashScreen.hide();
    },
    render () {
        return (
            <View style={styles.container}>
                <Cocos2dx
                    scene="MenuViewScene"
                    render={render}
                    resource={resource}
                    width={sr.tw}
                    height={sr.th}
                    />
            </View>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
