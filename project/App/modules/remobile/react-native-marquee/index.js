'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Text,
} = ReactNative;

var Button = require('@remobile/react-native-simple-button');
var MarqueeLabel = require('@remobile/react-native-marquee');

module.exports = React.createClass({
    getInitialState () {
        return {
            text:  '暗示健康等会拉时间段ksajdfkasdjkfasjdkfasldfjasdlf暗示健康等会拉',
            fontSize:  18,
            width:  sr.tw / 2,
            lineHeight:  50,
            color:  'red',
        };
    },
    changeContent () {
        if (!this.a) {
            this.a = true;
            this.setState({
                text:  '1231238123981273981273981273912873912873129837129837',
            });
        } else {
            this.a = false;
            this.setState({
                text:  '暗示健康等会拉时间段ksajdfkasdjkfasjdkfasldfjasdlf暗示健康等会拉',
            });
        }
    },
    changeStyle () {
        if (!this.b) {
            this.b = true;
            this.setState({
                fontSize:  50,
                width:  100,
                lineHeight:  150,
                color:  'blue',
            });
        } else {
            this.b = false;
            this.setState({
                fontSize:  18,
                width:  sr.tw / 2,
                lineHeight:  50,
                color:  'red',
            });
        }
    },
    render () {
        const { text, fontSize, color, width, lineHeight } = this.state;
        return (
            <View style={styles.container}>
                <MarqueeLabel style={[styles.label, { fontSize, color, width, lineHeight }]}>
                    {text}
                </MarqueeLabel>
                <Button onPress={this.changeContent}>改变内容</Button>
                <Button onPress={this.changeStyle}>改变样式</Button>
            </View>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
    },
    button: {
        backgroundColor: 'blue',
        width: sr.w / 2,
        borderWidth: 0,
    },
    label: {
        color: 'red',
        fontSize: 18,
        fontWeight: '800',
        letterSpacing: 10,
        fontStyle: 'italic',
        lineHeight: 50,
        backgroundColor: 'green',
        paddingHorizontal: 20,
        width: sr.w / 2,
        left: 100,
        overflow: 'hidden',
    },
});
