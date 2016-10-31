'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    View,
    Text,
} = ReactNative;

const TEXT = '0123456789abcdefghijklmnopqrstuvwxyzABCEFGHIJKLMNOPQRSTUVWXYZ`~!@#$%^&*()_+-={}[]|\\:;"\'<>,.?/';

module.exports = React.createClass({
    onLayout(key, e) {
        const {width} = e.nativeEvent.layout;
        this.props.setLetterWidth(key, width);
    },
    render() {
        const {fontSize} = this.props;
        return (
            <View style={{flexDirection:'row', position:'absolute', bottom: -1000}}>
                {
                    TEXT.split('').map((n, i)=><Text key={i} style={{fontSize}} onLayout={this.onLayout.bind(null, n)}>{n}</Text>)
                }
            </View>
        );
    }
});
