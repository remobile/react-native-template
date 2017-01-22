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
import ImageEditor from './imageZoom';

module.exports = React.createClass({
    componentDidMount() {
        SplashScreen.hide();
    },
    edit() {
        const cropData = this.image.getCropData();
        console.log("=======", cropData);
    },
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.edit}>编辑</Button>
                <ImageEditor ref={(ref)=>this.image = ref} source={{uri:'http://v1.qzone.cc/avatar/201407/07/00/24/53b9782c444ca987.jpg!200x200.jpg'}}>
                </ImageEditor>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
