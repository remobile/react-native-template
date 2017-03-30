'use strict';

const React = require('react');const ReactNative = require('react-native');

const {
    StyleSheet,
    View,
    Text,
    Image,
} = ReactNative;

const Button = require('@remobile/react-native-simple-button');
const Camera = require('@remobile/react-native-camera');
const Capture = require('@remobile/react-native-capture');
const { DImage } = COMPONENTS;

module.exports = React.createClass({
    getInitialState () {
        return {
            filePath: '',
        };
    },
    takePicture (i) {
        const options = [{
            quality: 30,
            allowEdit: true,
            targetWidth: 240,
            targetHeight: 240,
            cameraDirection: Camera.Direction.FRONT,
            destinationType: Camera.DestinationType.FILE_URI,
        }, {
            quality: 100,
            allowEdit: true,
            cameraDirection: Camera.Direction.FRONT,
            destinationType: Camera.DestinationType.FILE_URI,
        }, {
            quality: 100,
            allowEdit: false,
            cameraDirection: Camera.Direction.FRONT,
            destinationType: Camera.DestinationType.FILE_URI,
        }, {
            quality: 100,
            allowEdit: false,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        }, {
            quality: 30,
            allowEdit: true,
            targetWidth: 240,
            targetHeight: 240,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        }, {
            quality: 100,
            allowEdit: true,
            targetWidth: 240,
            targetHeight: 240,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        }, {
            quality: 100,
            allowEdit: false,
            destinationType: Camera.DestinationType.FILE_URI,
            mediaType:Camera.MediaType.VIDEO,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        }];
        Camera.getPicture((filePath) => {
            console.log(filePath);
            this.setState({ filePath:'file://' + filePath });
        }, null, options[i]);
    },
    taskVideo () {
        Capture.captureVideo((mediaFiles) => {
            const filePath = mediaFiles[0].fullPath;
            this.setState({ filePath });
        }, () => {
            Toast('录制失败');
        }, { limit:1 });
    },
    cleanup () {
        Camera.cleanup();
    },
    render () {
        const { filePath } = this.state;
        return (
            <View style={styles.container}>
                <Button onPress={this.takePicture.bind(null, 0)}>照相可编辑(30)</Button>
                <Button onPress={this.takePicture.bind(null, 1)}>照相可编辑(100)</Button>
                <Button onPress={this.takePicture.bind(null, 2)}>照相(100)</Button>
                <Button onPress={this.takePicture.bind(null, 3)}>选择(100)</Button>
                <Button onPress={this.takePicture.bind(null, 4)}>选择可编辑(30)</Button>
                <Button onPress={this.takePicture.bind(null, 5)}>选择可编辑(100)</Button>
                <Button onPress={this.takePicture.bind(null, 6)}>选择视频</Button>
                <Button onPress={this.taskVideo}>摄像</Button>
                <Button onPress={this.cleanup}>(ios)清除</Button>
                <Text>{filePath}</Text>
                <Image
                    resizeMode='stretch'
                    defaultSource={app.img.common_default}
                    source={{ uri: filePath }}
                    style={styles.image} />
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
    image: {
        width: sr.w - 40,
        height: 200,
        backgroundColor: 'gray',
    },
});
