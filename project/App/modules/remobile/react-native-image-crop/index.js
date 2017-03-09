'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    Image,
    ImageEditor,
} = ReactNative;

var Button = require('@remobile/react-native-simple-button');
var ImageCrop = require('@remobile/react-native-image-crop');

module.exports = React.createClass({
    getInitialState () {
        return {
            croppedImageURI: '',
        };
    },
    edit () {
        const cropData = this.imageCrop.getCropData();
        ImageEditor.cropImage(
            'http://localhost:3001/1.png',
            cropData,
            (croppedImageURI) => {
                this.setState({ croppedImageURI });
            },
            (error) => console.log(error)
        );
    },
    render () {
        return (
            <View style={styles.container}>
                <Button onPress={this.edit}>编辑</Button>
                <ImageCrop
                    imageWidth={375}
                    imageHeight={667}
                    editRectRadius={0}
                    ref={(ref) => { this.imageCrop = ref; }}
                    source={{ uri:'http://localhost:3001/1.png' }} />
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: this.state.croppedImageURI }}
                        style={styles.image}
                        />
                </View>
            </View>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        height: 200,
        marginTop: 20,
        backgroundColor: 'white',
    },
    image: {
        marginLeft: sr.w / 2 - 80,
        width: 160,
        height: 160,
    },
});
