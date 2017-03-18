'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
} = ReactNative;

var resolveAssetSource = require('resolveAssetSource');
var Cocos2dx = require('@remobile/react-native-cocos2dx');
var resource = require('./remobile_cocos2dx_resource.js');
var render = require('./remobile_cocos2dx_render.js');
module.exports = React.createClass({
    componentWillMount() {
        app.toggleNavigationBar(false);
    },
    onCocos2dxMessage(data) {
        if (data.type === 'exit') {
            app.toggleNavigationBar(true);
            app.navigator.pop();
        }
    },
    render () {
        return (
            <View style={styles.container}>
                <Cocos2dx
                    scene="MenuViewScene"
                    onCocos2dxMessage={this.onCocos2dxMessage}
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
