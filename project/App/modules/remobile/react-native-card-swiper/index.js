'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    Text,
} = ReactNative;

const CardSwiper = require('@remobile/react-native-card-swiper');

module.exports = React.createClass({
    getDefaultProps: function () {
        return {
            vertical: true,
        };
    },
    renderRow (obj) {
        return (
            <View style={styles.panel}>
                <Text>{obj}</Text>
            </View>
        );
    },
    onPressRow (obj) {
        Toast('' + obj);
    },
    onChange (obj) {
        console.log('onChange', obj);
    },
    render () {
        const { vertical } = this.props;
        return (
            <View style={[styles.container, { paddingLeft: vertical ? 50 : 0 }]}>
                <CardSwiper
                    index={0}
                    list={[1, 2, 3]}
                    vertical={vertical}
                    width={vertical ? 180 : sr.tw}
                    height={vertical ? sr.th / 2 : 150}
                    loop
                    onPress={this.onPressRow}
                    onChange={this.onChange}
                    renderRow={this.renderRow}
                    />
            </View>
        );
    },
});

const styles = StyleSheet.create({
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
