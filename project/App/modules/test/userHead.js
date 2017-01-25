'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Image,
} = ReactNative;

var SplashScreen = require('@remobile/react-native-splashscreen');
var Button = require('@remobile/react-native-simple-button');
var ImagePicker = require('../userHead/imagePicker');

module.exports = React.createClass({
    componentWillMount() {
        SplashScreen.hide();
        app.toggleNavigationBar(true);
    },
    getInitialState() {
        return {
            croppedImageURI: 'http://192.168.1.129:3001/1.png',
        };
    },
    onCropImage(croppedImageURI) {
        this.setState({croppedImageURI});
    },
    setUserHead() {
        app.navigator.push({
            component: ImagePicker,
            passProps: {
                onCropImage: this.onCropImage
            }
        });
    },
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.setUserHead}>设置头像</Button>
                <View style={styles.imageContainer}>
                    <Image
                        resizeMode='contain'
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
        backgroundColor: 'transparent',
        justifyContent: 'space-around',
        paddingVertical: 150,
    },
    imageContainer: {
        height: 200,
        marginTop: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    image: {
        marginLeft: sr.w/2-100,
        backgroundColor: 'black',
        width: 200,
        height: 200,
    },
});
