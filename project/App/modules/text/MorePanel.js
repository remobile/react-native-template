'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
} = ReactNative;
import { Carousel } from 'antd-mobile';
const data = require('./expressions').data;
const menuIcon = require('./img/emoji.png');

var MenuItem = React.createClass({
    render() {
        const {item, size, onPress} = this.props;
        const {img, index} = item;
        return (
            <TouchableOpacity style={styles.menuItem} onPress={onPress.bind(null, index)}>
                <Image resizeMode='stretch' source={menuIcon} style={{width:size, height:size}} />
            </TouchableOpacity>
        )
    }
});

module.exports = React.createClass({
    render() {
        const size = sr.ws(30), height = 220;
        const {onMenuPress} = this.props;
        return (
            <View style={styles.menuKeyboard}>
                <Carousel height={height}>
                {
                    data.map((page, p)=> {
                        return (
                            <View key={p}>
                                {
                                    page.map((row, i)=>{
                                        return (
                                            <View key={i} style={styles.menuRow}>
                                            {
                                                row.map((item, j)=>{
                                                    return (
                                                        <MenuItem key={j} item={item} size={size} onPress={onMenuPress} />
                                                    )
                                                })
                                            }
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }
                </Carousel>
            </View>
        )
    }
});


var styles = StyleSheet.create({
    menuKeyboard: {
        backgroundColor: '#FFFFFF',
    },
    menuRow: {
        height: 60,
        flexDirection: 'row',
    },
    menuItem: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});
