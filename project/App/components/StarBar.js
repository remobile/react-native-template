'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    Image,
    TouchableOpacity,
    View,
    StyleSheet,
} = ReactNative;

var MAX_STAR_NUM = 5;

module.exports = React.createClass({
    render() {
        var value = this.props.value;
        var starNum = Math.floor(value);
        var rest = value - starNum;
        var list = [];
        for (var i = 0; i < starNum; i++) {
            list[i] = 1;
        }
        if (i < MAX_STAR_NUM) {
            list[i] = rest <= 0.31 ? 2 : rest >= 0.69 ? 1 : 3;
            while (++i < MAX_STAR_NUM) {
                list[i] = 2;
            }
        }
        return (
            <View style={this.props.style?this.props.style:styles.scoreIconContainer}>
                {
                    list.map((item, i)=>{
                        var imgSource = app.img["actualCombat_star_"+item];
                        return (
                            <Image
                                key={i}
                                resizeMode='stretch'
                                source={imgSource}
                                style={this.props.starStyle?this.props.starStyle:styles.scoreIcon}
                                />
                        )
                    })
                }
            </View>
        );
    },
});

var styles = StyleSheet.create({
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
