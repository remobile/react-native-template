var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    Image,
} = ReactNative;

var CameraRollPicker = require('@remobile/react-native-camera-roll-picker');
var Camera = require('@remobile/react-native-camera');
var ImageCrop = require('./imageCrop');

module.exports = React.createClass({
    statics: {
        title: '选择头像',
    },
    cropImage (image) {
        app.navigator.replace({
            component: ImageCrop,
            passProps: {
                image,
                onCropImage: this.props.onCropImage,
            },
        });
    },
    onSelectedImages (images, image) {
        this.cropImage(image);
    },
    openCamera () {
        Camera.getPicture((filePath) => {
            const uri = 'file://' + filePath;
            Image.getSize(uri, (width, height) => {
                this.cropImage({
                    uri,
                    width,
                    height,
                });
            });
        }, null, {
            quality: 100,
            allowEdit: false,
            cameraDirection: Camera.Direction.FRONT,
            destinationType: Camera.DestinationType.FILE_URI,
        });
    },
    render () {
        return (
            <CameraRollPicker selected={[]} onSelectedImages={this.onSelectedImages} openCamera={this.openCamera} maximum={1} />
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6AE2D',
    },
});
