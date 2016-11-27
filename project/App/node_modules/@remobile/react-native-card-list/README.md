# React Native Card List (remobile)
A react-native card list write in js

## Installation
```sh
npm install @remobile/react-native-card-list --save
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
    Dimensions,
} = ReactNative;
var CardList = require('@remobile/react-native-card-list');
var {width, height} = Dimensions.get('window');

var LIST = [
    {color: 'red'},
    {color: 'blue'},
    {color: 'darkgray'},
    {color: 'pink'},
    {color: 'green'},
    {color: 'yellow'},
    {color: 'red'},
    {color: 'blue'},
    {color: 'darkgray'},
    {color: 'pink'},
    {color: 'green'},
    {color: 'yellow'},
    {color: 'red'},
    {color: 'blue'},
    {color: 'darkgray'},
    {color: 'pink'},
    {color: 'green'},
    {color: 'yellow'}
];


module.exports = React.createClass({
    onClickCard(i) {
        Toast(i+'');
    },
    renderRow(data, i, width, height) {
        return (
            <View style={{width, height, backgroundColor:data.color, alignItems:'center'}}>
                <Text>{i}</Text>
            </View>
        )
    },
    render() {
        return (
            <View style={styles.container}>
                <CardList
                    list={LIST}
                    renderRow={this.renderRow}
                    height={300}
                    panelHeight={height-100}
                    panelWidth={width-100}
                    offsetTop={50}
                    offsetLeft={50}
                    onClickCard={this.onClickCard}/>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
    },
});
```

## Screencasts

![demo](https://github.com/remobile/react-native-card-list/blob/master/screencasts/demo.gif)

#### Props
- `list: PropTypes.list` card data list
- `height: PropTypes.number` card item height
- `panelHeight: propTypes.number` card container height
- `panelWidth: PropTypes.number` card container width
- `offsetTop: PropTypes.number` card container top offset of screen
- `offsetLeft: PropTypes.number` card container left offset of screen
- `onClickCard: PropTypes.func [args: i]` the callback of click card, args i is card index of clicked card
- `renderRow: PropTypes.func [args: data, i, width, height]` row render function
