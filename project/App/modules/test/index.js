'use strict';

var React = require('react');
var ReactNative = require('react-native');

var {
    StyleSheet,
    View,
    Text,
    Image,
} = ReactNative;

var SplashScreen = require('@remobile/react-native-splashscreen');
var Button = require('@remobile/react-native-simple-button');


module.exports = React.createClass({
    componentDidMount() {
        SplashScreen.hide();
    },
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    fangyunjiang,我叫方运江
                </Text>
                <Text>
                    fangyunjiang,我叫方运江
                </Text>
                <Text style={styles.text1}>
                    fangyunjiang,我叫方运江
                </Text>
                <Button onPress={() => {
                        app.showProgressHUD();
                    }} >
                    普通地图
                </Button>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: 50,
    },
    text: {
        fontSize: 16,
        color:'red',
    },
    text1: {
        fontSize: 14,
    },
});
