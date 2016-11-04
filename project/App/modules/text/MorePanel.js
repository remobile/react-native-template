'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
} = ReactNative;
import { Carousel } from 'antd-mobile';
const data = require('./menu').data;

var MenuItem = React.createClass({
    render() {
        const {item, size, onPress} = this.props;
        const {icon, index} = item;
        return (
            icon!=null ?
            <TouchableOpacity style={styles.menuItem} onPress={onPress.bind(null, index)}>
                <Image resizeMode='stretch' source={icon.img} style={{width:size, height:size}} />
                <Text style={styles.label}>{icon.text}</Text>
            </TouchableOpacity>
            :
            <View style={styles.menuItem} />
        )
    }
});

module.exports = React.createClass({
    render() {
        const size = sr.ws(50);
        const {onMenuPress, keyboardHeight} = this.props;
        return (
            <View style={styles.menuKeyboard}>
                <Carousel height={keyboardHeight}>
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
        height: 90,
        flexDirection: 'row',
    },
    menuItem: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    label: {
        fontSize: 16,
        marginTop: 4,
        color: '#8C8C8C',
    },
});
