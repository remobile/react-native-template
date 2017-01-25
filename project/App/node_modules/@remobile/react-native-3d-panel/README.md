# React Native 3D Left Menu (remobile)
A 3d left menu like old version QQ.

## Installation
```sh
npm install @remobile/react-native-3d-panel --save
```

## Usage

### Example
```js
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    Image,
} = ReactNative;

var Panel = require('@remobile/react-native-3d-panel');
var Menu = require('../person/Settings');
var image = require('./1.jpg');

module.exports = React.createClass({
    render() {
        const menu = (
            <Menu />
        );
        return (
            <Panel leftMenu={menu}>
                <Image
                    resizeMode='stretch'
                    source={image}
                    style={styles.image}>
                </Image>
            </Panel>
        )
    }
});

var styles = StyleSheet.create({
    image: {
        width: sr.w,
        height: sr.h,
    },
});
```

## Screencasts

![demo](https://github.com/remobile/react-native-3d-panel/blob/master/screencasts/demo.jpg)

#### Props
- `leftMenu: PropTypes.Component.required`
- `children: PropTypes.Component.required`
- `speed: PropTypes.number.required` default:500
- `menuWidth: PropTypes.number.required` default:Dimensions.get('window').width*2/3
