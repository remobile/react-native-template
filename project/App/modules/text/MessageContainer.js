'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Text,
} = ReactNative;

module.exports = React.createClass({
    render() {
        let {children, send, backgroundColor, style} = this.props;
        backgroundColor = backgroundColor || (send?'#A6DC3E':'#FFFFFF');
        return (
            <View style={[styles.messageContainer, style, send && {justifyContent: 'flex-end', alignSelf: 'flex-end'}]}>
                <View style={[styles.contentContainer, send?styles.contentContainerRight:styles.contentContainerLeft, {backgroundColor}]} >
                    {children}
                </View>
                <View style={[styles.triangleContainer, send?styles.triangleContainerRight:styles.triangleContainerLeft]} >
                    <View style={[styles.triangle, styles.triangleOuter]} >
                        <View style={[styles.triangle, styles.triangleInner, {borderBottomColor: backgroundColor}]} />
                    </View>
                </View>
            </View>
        )
    }
});

var styles = StyleSheet.create({
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    triangleContainer: {
        position: 'absolute',
        top: 15,
        width: 7,
        height: 7,
        alignItems: 'center',
    },
    triangleContainerLeft: {
        left: 0,
        transform: [{rotate: '-90deg'}],
    },
    triangleContainerRight: {
        right: 0,
        transform: [{rotate: '90deg'}],
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    },
    triangleOuter: {
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderBottomWidth: 8,
        borderBottomColor: '#CCCCCC',
    },
    triangleInner: {
        right: 5,
        top: 1,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 8,
    },
    contentContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#CCCCCC',
    },
    contentContainerLeft: {
        marginLeft: 7,
    },
    contentContainerRight: {
        marginRight: 7,
    },
});
