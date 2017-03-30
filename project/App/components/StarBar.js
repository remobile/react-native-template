'use strict';

const React = require('react');const ReactNative = require('react-native');
const {
    Image,
    TouchableOpacity,
    View,
    StyleSheet,
} = ReactNative;

const MAX_STAR_NUM = 5;

module.exports = React.createClass({
    render () {
        const value = this.props.value;
        const starNum = Math.floor(value);
        const rest = value - starNum;
        const list = [];
        let i;
        for (i = 0; i < starNum; i++) {
            list[i] = 1;
        }
        if (i < MAX_STAR_NUM) {
            list[i] = rest <= 0.31 ? 2 : rest >= 0.69 ? 1 : 3;
            while (++i < MAX_STAR_NUM) {
                list[i] = 2;
            }
        }
        return (
            <View style={this.props.style ? this.props.style : styles.scoreIconContainer}>
                {
                    list.map((item, i) => {
                        const imgSource = app.img['actualCombat_star_' + item];
                        return (
                            <Image
                                key={i}
                                resizeMode='stretch'
                                source={imgSource}
                                style={this.props.starStyle ? this.props.starStyle : styles.scoreIcon}
                                />
                        );
                    })
                }
            </View>
        );
    },
});

const styles = StyleSheet.create({
    scoreIconContainer: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    scoreIcon: {
        marginLeft: 3,
        width: 20,
        height: 20,
    },
});
