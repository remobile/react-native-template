'use strict';

var React = require('react');var ReactNative = require('react-native');

var {
    StyleSheet,
    View,
    Text,
    Image,
} = ReactNative;

var SplashScreen = require('@remobile/react-native-splashscreen');
var Button = require('@remobile/react-native-simple-button');
var FileTransfer = require('@remobile/react-native-file-transfer');

module.exports = React.createClass({
    componentDidMount () {
        SplashScreen.hide();
    },
    downloadApkFromServer () {
        var oldval;
        var fileTransfer = new FileTransfer();
        fileTransfer.onprogress = (progress) => {
            var val = parseInt(progress.loaded * 100 / progress.total);
            if (oldval !== val) {
                console.log(val);
                oldval = val;
            }
        };
        fileTransfer.download(
            app.route.ROUTE_APK_URL,
            '/Users/fang/work/test/project/jfbsample.apk',
            (result) => {
                console.log(result);
            },
            (error) => {
                console.log(error);
            },
            true
        );
    },
    render () {
        return (
            <View style={styles.container}>
                <Button onPress={this.downloadApkFromServer}>下载</Button>
            </View>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
