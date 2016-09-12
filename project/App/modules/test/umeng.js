'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
} = ReactNative;

var Button = require('@remobile/react-native-simple-button');
var Umeng = require('../../native/index.js').Umeng;



module.exports = React.createClass({
    doActionSheetShare() {
        Umeng.shareWithActionSheet({
            url: "http://www.baidu.com",
            title: "title",
            text: "text",
        }, (result)=>{
            console.log("success", result);
        });
    },
    doSingleShare() {
        Umeng.shareSingle(Umeng.platforms.UMShareToWechatSession, {
            url: "http://www.baidu.com",
            title: "title",
            text: "text",
        }, (result)=>{
            console.log("success", result);
        });
    },
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.doActionSheetShare}>默认分享</Button>
                <Button onPress={this.doSingleShare}>单独分享</Button>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-around',
        paddingVertical: 150,
    },
});
