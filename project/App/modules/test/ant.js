'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Image,
} = ReactNative;
import {Button} from 'antd-mobile';

module.exports = React.createClass({
    render() {
        return (
            <View style={styles.container}>
                <Button style={styles.button} disabled={false}>Start</Button>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
    },
    button: {
        backgroundColor: 'blue',
        width: sr.mw,
        borderWidth: 0,
    }
});
