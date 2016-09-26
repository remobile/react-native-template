'use strict';

var React = require('react');
var {
    PropTypes
} = React;
var ReactNative = require('react-native');
var {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} = ReactNative;

const DEFAULT_OPACITY = 0.2;

module.exports = React.createClass({
    propTypes: {
        onPress: PropTypes.func,
        disable: PropTypes.bool,
        textStyle: Text.propTypes.style,
        activeOpacity: PropTypes.number,
    },
    render() {
        var touchableProps = {
            activeOpacity: this.props.disable?1:this.props.activeOpacity?this.props.activeOpacity:DEFAULT_OPACITY,
        };
        if (!this.props.disable) {
            touchableProps.onPress = this.props.onPress;
        }
        return (
            <TouchableOpacity
                style={this.props.style} {...touchableProps}
                testID={this.props.testID}>
                <Text style={[styles.text, this.props.disable ? styles.disableText : null, this.props.textStyle]}>
                    {this.props.children}
                </Text>
            </TouchableOpacity>
        );
    },
});

var styles = StyleSheet.create({
    text: {
        color: '#5890ff',
        fontFamily: '.HelveticaNeueInterface-MediumP4',
        fontSize: 18,
        fontWeight: '100',
        textAlign: 'center',
    },
    disableText: {
        color: '#dcdcdc',
    },
    group: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
