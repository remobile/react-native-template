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

var SplashScreen = require('@remobile/react-native-splashscreen');
var Button = require('@remobile/react-native-simple-button');
var ImageCrop = require('@remobile/react-native-image-crop');

module.exports = React.createClass({

    componentDidMount() {
        SplashScreen.hide();
    },
    getInitialState() {
        return {
            croppedImageURI: '',
        };
    },
    edit() {
        const cropData = this.imageCrop.getCropData();
        ImageEditor.cropImage(
            'http://192.168.1.129:3001/1.png',
            cropData,
            (croppedImageURI) => {
                this.setState({croppedImageURI})
            },
            (error) => console.log(error)
        );
    },
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.edit}>编辑</Button>
                <ImageCrop
                    imageWidth={1080}
                    imageHeight={1920}
                    editRectRadius={0}
                    ref={(ref)=>this.imageCrop = ref}
                    source={{uri:'http://192.168.1.129:3001/1.png'}} />
                <View style={styles.imageContainer}>
                    <Image
                        source={{uri: this.state.croppedImageURI}}
                        style={styles.image}
                        />
                </View>
            </View>
        );
    }
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
        marginLeft: sr.w/2-100,
        width: 200,
        height: 200,
    },
});
