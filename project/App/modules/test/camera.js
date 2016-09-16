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
var Camera = require('@remobile/react-native-camera');
module.exports = React.createClass({
    componentDidMount() {
        SplashScreen.hide();
    },
    getInitialState() {
        return {
            filePath: '',
        };
    },
    takePicture() {
        var options1 = {
            quality: 30,
            allowEdit: true,
            targetWidth: 240,
            targetHeight: 240,
            cameraDirection: Camera.Direction.FRONT,
            destinationType: Camera.DestinationType.FILE_URI,
        };
        var options2 = {
            quality: 100,
            allowEdit: false,
            cameraDirection: Camera.Direction.FRONT,
            destinationType: Camera.DestinationType.FILE_URI,
        };
        var options3 = {
            quality: 100,
            allowEdit: false,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        };
        var options4 = {
            quality: 30,
            allowEdit: true,
            targetWidth: 240,
            targetHeight: 240,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        };
        var options5 = {
            quality: 100,
            allowEdit: false,
            destinationType: Camera.DestinationType.FILE_URI,
            mediaType:Camera.MediaType.VIDEO,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        };
        Camera.getPicture(options1, (filePath) => {
            this.setState({filePath});
        });
    },
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.takePicture}>照相</Button>
                <Text>
                    {this.state.filePath}
                </Text>
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
