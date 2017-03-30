'use strict';

const React = require('react');const ReactNative = require('react-native');

const {
    StyleSheet,
    View,
    Text,
    Image,
} = ReactNative;

const SplashScreen = require('@remobile/react-native-splashscreen');
const Button = require('@remobile/react-native-simple-button');
const FileTransfer = require('@remobile/react-native-file-transfer');

module.exports = React.createClass({
    componentDidMount () {
        SplashScreen.hide();
    },
    downloadApkFromServer () {
        let oldval;
        const fileTransfer = new FileTransfer();
        fileTransfer.onprogress = (progress) => {
            const val = parseInt(progress.loaded * 100 / progress.total);
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
