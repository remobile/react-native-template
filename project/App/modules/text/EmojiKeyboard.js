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
const deleteIcon = require('./img/delete.png');

var EmojiItem = React.createClass({
    render() {
        const {item, size, onPress, onPressDelete} = this.props;
        const {img, index, isDelete} = item;
        return (
            isDelete ?
            <TouchableOpacity style={styles.emojiItem} onPress={onPressDelete}>
                <Image resizeMode='stretch' source={deleteIcon} style={{width:size*1.3, height:size}} />
            </TouchableOpacity>
            : img!=null ?
            <TouchableOpacity style={styles.emojiItem} onPress={onPress.bind(null, index)}>
                <Image resizeMode='stretch' source={img} style={{width:size, height:size}} />
            </TouchableOpacity>
            :
            <View style={styles.emojiItem} />
        )
    }
});

module.exports = React.createClass({
    componentDidMount() {
        this.props.onMounted(true);
    },
    componentWillUnmount() {
        this.props.onMounted(false);
    },
    render() {
        const size = sr.ws(30);
        const {isBlank, onEmojiPress, onPressDelete, keyboardHeight} = this.props;
        return (
            isBlank ?
            <View style={{height: keyboardHeight}} />
            :
            <View style={styles.emojiKeyboard}>
                <Carousel height={keyboardHeight}>
                {
                    data.map((page, p)=> {
                        return (
                            <View key={p}>
                                {
                                    page.map((row, i)=>{
                                        return (
                                            <View key={i} style={styles.emojiRow}>
                                            {
                                                row.map((item, j)=>{
                                                    return (
                                                        <EmojiItem key={j} item={item} size={size} onPress={onEmojiPress} onPressDelete={onPressDelete}/>
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
    emojiKeyboard: {
        backgroundColor: '#FFFFFF',
    },
    emojiRow: {
        height: 60,
        flexDirection: 'row',
    },
    emojiItem: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});
