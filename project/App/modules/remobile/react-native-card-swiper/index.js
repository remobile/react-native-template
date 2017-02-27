'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Text,
} = ReactNative;

var CardSwiper = require('@remobile/react-native-card-swiper');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            vertical: false,
        };
    },
    renderRow(obj) {
        return (
            <View style={styles.panel}>
                <Text>{obj}</Text>
            </View>
        )
    },
    onPressRow(obj) {
        console.log('onPressRow', obj);
    },
    onChange(obj) {
        console.log('onChange', obj);
    },
    render() {
        const {vertical} = this.props;
        return (
            <View style={[styles.container, {paddingLeft: vertical ? 50 : 0}]}>
                <CardSwiper
                    list={[1, 2, 3]}
                    vertical={vertical}
                    width={vertical ? 180 : sr.tw}
                    height={vertical ? sr.th/2 : 150}
                    loop={true}
                    onPress={this.onPressRow}
                    onChange={this.onChange}
                    renderRow={this.renderRow}
                    />
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
    },
    panel: {
        backgroundColor: 'green',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
