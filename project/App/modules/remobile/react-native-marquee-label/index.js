'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
} = ReactNative;

var MarqueeLabel = require('@remobile/react-native-marquee-label');

module.exports = React.createClass({
    render: function () {
        return (
            <View style={styles.container}>
                <MarqueeLabel style={styles.marqueeLabel}
                    scrollDuration={3.0}
                    >
                    fangyunjiang is a good developer
                </MarqueeLabel>
            </View>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    marqueeLabel: {
        backgroundColor: 'blue',
        width:260,
        height:200,
        fontSize:30,
        fontWeight:'800',
        color:'white',
    },
});
