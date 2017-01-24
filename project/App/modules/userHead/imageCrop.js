'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    ImageEditor,
} = ReactNative;

var ImageCrop = require('@remobile/react-native-image-crop');

module.exports = React.createClass({
    mixins: [SceneMixin],
    statics: {
        title: '编辑头像',
        rightButton: { title: '完成', handler: ()=>{
            app.scene.cropImage()
        }},
    },
    goBack() {
        app.navigator.pop();
    },
    cropImage() {
        const {image, onCropImage} = this.props;
        const cropData = this.imageCrop.getCropData();
        ImageEditor.cropImage(
            image.uri,
            cropData,
            (croppedImageURI) => {
                onCropImage(croppedImageURI);
                this.goBack();
            },
            (error) => {
                this.goBack();
            }
        );
    },
    render() {
        const {image} = this.props;
        return (
            <View style={styles.container}>
                <ImageCrop
                    imageWidth={image.width}
                    imageHeight={image.height}
                    editRectRadius={0}
                    ref={(ref)=>this.imageCrop = ref}
                    source={{uri: image.uri}} />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
