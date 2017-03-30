'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
} = ReactNative;

const MarqueeLabel = require('@remobile/react-native-marquee-label');

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

const styles = StyleSheet.create({
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
