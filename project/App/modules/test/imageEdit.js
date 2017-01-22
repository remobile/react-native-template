'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    ImageEditor,
    ImageStore,
    Image,
    View,
} = ReactNative;

var SplashScreen = require('@remobile/react-native-splashscreen');
var Button = require('@remobile/react-native-simple-button');

module.exports = React.createClass({
    componentWillMount() {
        SplashScreen.hide();
    },
    getInitialState() {
        return {
            myuri: '',
        }
    },
    edit() {
        ImageEditor.cropImage('file:///Users/fang/rn/react-native-template/project/App/modules/test/1.jpg', {
            offset: {x: 0, y: 0},
            size: {width: 100, height: 100},
            displaySize: {width: 50, height: 50},
        }, (uri, a, b)=>{
            this.setState({myuri: uri});
            console.log('success:', uri, a, b);
        }, (error, a, b)=>{
            console.log('error:', error, a, b);
        });
    },
    see() {
        ImageStore.getBase64ForTag('rct-image-store://0', (x, y)=>{
            console.log('success2:', x, y);
        }, (x, y)=>{
            console.log('error2:', x, y);
        });

    },
    render() {
        return (
            <View style={styles.container}>
                <Image resizeMode='contain' source={{uri: 'file:///Users/fang/rn/react-native-template/project/App/modules/test/1.jpg'}} style={styles.image1}/>
                <Button onPress={this.edit}>编辑</Button>
                <Button onPress={this.see}>查看</Button>
                <Image resizeMode='contain' source={{uri: this.state.myuri}} style={styles.image2}/>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-around',
    },
    image1: {
        width: sr.w,
        height: sr.w,
    },
    image2: {
        width: 200,
        height: 200,
    }
});
