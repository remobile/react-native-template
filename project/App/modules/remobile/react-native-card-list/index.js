'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    Text,
    Dimensions,
} = ReactNative;

const CardList = require('@remobile/react-native-card-list');
const { width, height } = Dimensions.get('window');

const LIST = [
    { color: 'red' },
    { color: 'blue' },
    { color: 'darkgray' },
    { color: 'pink' },
    { color: 'green' },
    { color: 'yellow' },
    { color: 'red' },
    { color: 'blue' },
    { color: 'darkgray' },
    { color: 'pink' },
    { color: 'green' },
    { color: 'yellow' },
    { color: 'red' },
    { color: 'blue' },
    { color: 'darkgray' },
    { color: 'pink' },
    { color: 'green' },
    { color: 'yellow' },
];

module.exports = React.createClass({
    onClickCard (i) {
        Toast(i + '');
    },
    renderRow (data, i, width, height) {
        return (
            <View style={{ width, height, backgroundColor:data.color, alignItems:'center' }}>
                <Text>{i}</Text>
            </View>
        );
    },
    render () {
        return (
            <View style={styles.container}>
                <CardList
                    list={LIST}
                    renderRow={this.renderRow}
                    height={300}
                    panelHeight={height - 100}
                    panelWidth={width - 100}
                    offsetTop={50}
                    offsetLeft={50}
                    onClickCard={this.onClickCard} />
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: sr.rs(50),
    },
});
