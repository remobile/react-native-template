'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    Text,
    Platform,
} = ReactNative;

var RText = React.createClass({
    render() {
        const {children, style, ...props} = this.props;
        const s = StyleSheet.flatten(style);
        const {lineHeight, fontSize} = s;
        const paddingVertical = (lineHeight-fontSize)/2;
        return (
            <Text
                style={[{paddingVertical}, style]}
                testID={this.props.testID}
                {...props}
                >
                {this.props.children}
            </Text>
        );
    },
});

module.exports = Platform.OS==='android' ?  RText : Text;
