'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    Image,
    View,
} = ReactNative;

const ClipRect = require('@remobile/react-native-clip-rect');

module.exports = React.createClass({
    render () {
        const overlayColor = 'rgba(0, 0, 0, 0.5)';
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={app.img.splash_logo} />
                <View style={{ flex: 1, backgroundColor: overlayColor }} />
                <View style={{ flexDirection: 'row' }} >
                    <View style={{ flex: 1, backgroundColor: overlayColor }} />
                    <ClipRect style={{ width: 200, height: 200, borderRadius: 10, color: overlayColor }} />
                    <View style={{ flex: 1, backgroundColor: overlayColor }} />
                </View>
                <View style={{ flex: 1, backgroundColor: overlayColor }} />
            </View>
        );
    },
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: sr.w,
        height: sr.w,
        top: (sr.h - sr.w) / 2,
        position: 'absolute',
    },
});
