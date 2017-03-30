'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
} = ReactNative;

const resolveAssetSource = require('resolveAssetSource');
const Cocos2dx = require('@remobile/react-native-cocos2dx');
const resource = require('./remobile_cocos2dx_resource.js');
const render = require('./remobile_cocos2dx_render.js');
module.exports = React.createClass({
    componentWillMount () {
        app.toggleNavigationBar(false);
    },
    onCocos2dxMessage (data) {
        if (data.type === 'exit') {
            app.toggleNavigationBar(true);
            app.navigator.pop();
        }
    },
    render () {
        return (
            <View style={styles.container}>
                <Cocos2dx
                    scene='MenuViewScene'
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
