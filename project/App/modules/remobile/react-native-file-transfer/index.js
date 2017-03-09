var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    NativeAppEventEmitter,
    View,
    Text,
} = ReactNative;

var FileTransfer = require('@remobile/react-native-file-transfer');
var Button = require('@remobile/react-native-simple-button');

module.exports = React.createClass({
    testUpload () {
        var fileURL = app.isandroid ? 'file:///sdcard/1/jsandroid.zip' : 'file:///Users/fang/rn/react-native-template/localServer/public/exhibition.apk';
        var options = {};
        options.fileKey = 'file';
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        options.mimeType = 'text/plain';
        // options.chunkedMode = false;

        var params = {};
        params.value1 = 'test';
        params.value2 = 'param';

        options.params = params;
        var fileTransfer = new FileTransfer();
        fileTransfer.onprogress = (progress) => console.log('progress', progress.loaded + '/' + progress.total);

        fileTransfer.upload(fileURL, encodeURI('http://192.168.1.131:3000/app/api/uploadMediaFile'), (result) => {
            console.log(result);
        }, (error) => {
            console.log(error);
        }, options);
    },
    testDownload () {
        var fileTransfer = new FileTransfer();
        var uri = encodeURI('http://192.168.1.131:3000/medias/exhibition.apk');
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

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingVertical:200,
    },
});
