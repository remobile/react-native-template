'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    Dimensions,
} = ReactNative;
var SplashScreen = require('@remobile/react-native-splashscreen');
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
    componentWillMount() {
        SplashScreen.hide();
    },
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
        padding: sr.rws(50),
    },
});
