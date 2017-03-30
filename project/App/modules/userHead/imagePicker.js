const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    Text,
    View,
    Image,
} = ReactNative;

const CameraRollPicker = require('@remobile/react-native-camera-roll-picker');
const Camera = require('@remobile/react-native-camera');
const ImageCrop = require('./imageCrop');

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
