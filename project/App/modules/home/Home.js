'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    Image,
} = ReactNative;

var PersonInfo = require('../person/PersonInfo.js');

var {StarBar} = COMPONENTS;

module.exports = React.createClass({
    statics: {
        title: CONSTANTS.APP_NAME,
        leftButton: { image: app.img.common_left_menu, handler: ()=>{
            app.navigator.push({
                component: PersonInfo,
                fromLeft: true,
            });
        }},
    },
    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    },
});
