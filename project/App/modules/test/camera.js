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
var Camera = require('@remobile/react-native-camera');
module.exports = React.createClass({
    componentDidMount() {
        SplashScreen.hide();
    },
    takePicture() {
        var options = {
            quality: 30,
            allowEdit: true,
            targetWidth: 240,
            targetHeight: 240,
            cameraDirection: Camera.Direction.FRONT,
            destinationType: Camera.DestinationType.FILE_URI,
        };
        Camera.getPicture(options, (filePath) => {
            console.log(filePath);
        });
    },
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.takePicture}>照相</Button>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
