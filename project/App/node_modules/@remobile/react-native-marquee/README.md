# React Native Marquee (remobile)
A react-native marquee list write in js

## Installation
```sh
npm install @remobile/react-native-marquee --save
```

## Usage

### Example
```js
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Text,
} = ReactNative;

var Button = require('@remobile/react-native-simple-button');
var Marquee = require('@remobile/react-native-marquee');

module.exports = React.createClass({
    getInitialState() {
        return {
            text:  '暗示健康等会拉时间段ksajdfkasdjkfasjdkfasldfjasdlf暗示健康等会拉',
            fontSize:  18,
            width:  200,
            lineHeight:  50,
            color:  'red',
        };
    },
    changeContent() {
        if (!this.contentFlag) {
            this.contentFlag = true;
            this.setState({
                text:  '1231238123981273981273981273912873912873129837129837',
            });
        } else {
            this.contentFlag = false;
            this.setState({
                text:  '暗示健康等会拉时间段ksajdfkasdjkfasjdkfasldfjasdlf暗示健康等会拉',
            });
        }
    },
    changeStyle() {
        if (!this.styleFlag) {
            this.styleFlag = true;
            this.setState({
                fontSize:  50,
                width:  100,
                lineHeight:  150,
                color:  'blue',
            });
        } else {
            this.styleFlag = false;
            this.setState({
                fontSize:  18,
                width:  200,
                lineHeight:  50,
                color:  'red',
            });
        }
    },
    render() {
        const {text, fontSize, color, width, lineHeight} = this.state;
        return (
            <View style={styles.container}>
                <Marquee style={[styles.label, {fontSize, color, width, lineHeight}]}>
                    {text}
                </Marquee>
                <Button onPress={this.changeContent}>改变内容</Button>
                <Button onPress={this.changeStyle}>改变样式</Button>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
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
        width: 200,
        left: 100,
        overflow: 'hidden',
    },
});
```

## Screencasts

![demo](https://github.com/remobile/react-native-marquee/blob/master/screencasts/demo.gif)

#### Props
- `children: React.PropTypes.string.isRequired` show text
- `speed: React.PropTypes.number`  letter move speed, unit is ms, default is 10
- `spaceRatio: React.PropTypes.number` the space ratio of container width
- `style: PropTypes.style` view style and text style
