const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    NativeAppEventEmitter,
    View,
    Text,
} = ReactNative;

const FileTransfer = require('@remobile/react-native-file-transfer');
const Button = require('@remobile/react-native-simple-button');

module.exports = React.createClass({
    testUpload () {
        const fileURL = app.isandroid ? 'file:///sdcard/1/jsandroid.zip' : 'file:///Users/fang/rn/react-native-template/localServer/public/exhibition.apk';
        const options = {};
        options.fileKey = 'file';
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        options.mimeType = 'text/plain';
        // options.chunkedMode = false;

        const params = {};
        params.value1 = 'test';
        params.value2 = 'param';

        options.params = params;
        const fileTransfer = new FileTransfer();
        fileTransfer.onprogress = (progress) => console.log('progress', progress.loaded + '/' + progress.total);

        fileTransfer.upload(fileURL, encodeURI('http://192.168.1.131:3000/app/api/uploadMediaFile'), (result) => {
            console.log(result);
        }, (error) => {
            console.log(error);
        }, options);
    },
    testDownload () {
        const fileTransfer = new FileTransfer();
        const uri = encodeURI('http://192.168.1.131:3000/medias/exhibition.apk');
        fileTransfer.onprogress = (progress) => console.log('progress', progress.loaded + '/' + progress.total);
        fileTransfer.download(
              uri,
              app.isandroid ? '/sdcard/1/xx.apk' : '/Users/fang/rn/react-native-template/localServer/public/xx.apk',
              function (result) {
                  console.log(result);
              },
              function (error) {
                  console.log(error);
              },
              true
          );
    },
    render () {
        return (
            <View style={styles.container}>
                <Button onPress={this.testUpload}>
                    Test Upload
                </Button>
                <Button onPress={this.testDownload}>
                    Test Download
                </Button>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingVertical:200,
    },
});
