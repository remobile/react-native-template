'use strict';

const React = require('react');const ReactNative = require('react-native');
const {
    StyleSheet,
    Text,
    Platform,
} = ReactNative;

const RText = React.createClass({
    render () {
        const { children, style, ...props } = this.props;
        const s = StyleSheet.flatten(style);
        const { lineHeight, fontSize } = s;
        const paddingVertical = (lineHeight - fontSize) / 2;
        return (
            <Text
                style={[{ paddingVertical }, style]}
                testID={this.props.testID}
                {...props}
                >
                {this.props.children}
            </Text>
        );
    },
});

module.exports = Platform.OS === 'android' ? RText : Text;
