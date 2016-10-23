'use strict';

var React = require('react');
var ReactNative = require('react-native');

var {
    StyleSheet,
    View,
    Text,
    Image,
    StatusBar,
    Platform,
    screenPhysicalPixels,
    Dimensions,
    UIManager,
    TextInput,
    Keyboard,
    ScrollView,
    TouchableOpacity,
    PanResponder,
} = ReactNative;

var SplashScreen = require('@remobile/react-native-splashscreen');
var Button = require('@remobile/react-native-simple-button');
import  Swipeout  from 'react-native-swipe-out';
const dismissKeyboard = require('dismissKeyboard');

const
ENGLISH_TYPE = 0,
CHINESE_TYPE = 1,
EMOJI_TYPE = 2,
END_TYPE = 3;

var WordItem = React.createClass({
    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => true,
            onPanResponderGrant: (e, gestureState) => {
                console.log("======", this.props.item.index);
                this.props.onFocus(this.props.item.index);
            },
        });
    },
    getWordWith(type, height, val) {
        if (type === ENGLISH_TYPE) {
            return height/1.5;
        } else if (type === CHINESE_TYPE) {
            return height;
        } else {
            return height/1.5;
        }
    },
    render() {
        const {item, fontSize} = this.props;
        const {focus, type, val, width, height} = item;
        if (type===END_TYPE) {
            return (
                <View style={{flex:1, height, flexDirection: 'row'}} {...this._panResponder.panHandlers}>
                    <View style={{marginLeft: 1, width:1, height, backgroundColor: focus?'black':'transparent'}}/>
                </View>
            )
        } else {
            return (
                <View style={{width: width+2, height, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} {...this._panResponder.panHandlers}>
                    <View style={{width:1, height, marginRight: 1, backgroundColor: focus?'black':'transparent'}}/>
                    {
                        type===EMOJI_TYPE ?
                        <Image resizeMode='stretch' source={val} style={{width, height}} />
                        :
                        <Text style={{fontSize}}>{val}</Text>
                    }
                </View>
            )
        }
    }
});

module.exports = React.createClass({
    componentWillMount() {
        SplashScreen.hide();
    },
    getInitialState() {
        return {
            wordsList: [
                {type: ENGLISH_TYPE, val: 'a', width: 10, height: 14},
                {type: CHINESE_TYPE, val: '方', width: 14, height: 14},
                {type: EMOJI_TYPE, val: app.img.common_go, width: 14, height: 14},
                {type: ENGLISH_TYPE, val: 'a', width: 10, height: 14},
                {type: CHINESE_TYPE, val: '方', width: 14, height: 14},
                {type: EMOJI_TYPE, val: app.img.common_go, width: 14, height: 14},
                {type: ENGLISH_TYPE, val: 'a', width: 10, height: 14},
                {type: CHINESE_TYPE, val: '方', width: 14, height: 14},
                {type: EMOJI_TYPE, val: app.img.common_go, width: 14, height: 14},
                {type: ENGLISH_TYPE, val: 'a', width: 10, height: 14},
                {type: CHINESE_TYPE, val: '方', width: 14, height: 14},
                {type: EMOJI_TYPE, val: app.img.common_go, width: 14, height: 14},
                {type: ENGLISH_TYPE, val: 'a', width: 10, height: 14},
                {type: CHINESE_TYPE, val: '方', width: 14, height: 14},
                {type: EMOJI_TYPE, val: app.img.common_go, width: 14, height: 14},
                {type: ENGLISH_TYPE, val: 'a', width: 10, height: 14},
                {type: CHINESE_TYPE, val: '方', width: 14, height: 14},
                {type: EMOJI_TYPE, val: app.img.common_go, width: 14, height: 14},
                {type: ENGLISH_TYPE, val: 'a', width: 10, height: 14},
                {type: CHINESE_TYPE, val: '方', width: 14, height: 14},
                {type: EMOJI_TYPE, val: app.img.common_go, width: 14, height: 14},
                {type: ENGLISH_TYPE, val: 'a', width: 10, height: 14},
                {type: CHINESE_TYPE, val: '方', width: 14, height: 14},
                {type: EMOJI_TYPE, val: app.img.common_go, width: 14, height: 14},
                {type: ENGLISH_TYPE, val: 'a', width: 10, height: 14},
                {type: CHINESE_TYPE, val: '方', width: 14, height: 14},
                {type: EMOJI_TYPE, val: app.img.common_go, width: 14, height: 14},
                {type: ENGLISH_TYPE, val: 'a', width: 10, height: 14},
                {type: CHINESE_TYPE, val: '方', width: 14, height: 14},
                {type: EMOJI_TYPE, val: app.img.common_go, width: 14, height: 14},
                {type: ENGLISH_TYPE, val: 'a', width: 10, height: 14},
                {type: CHINESE_TYPE, val: '方', width: 14, height: 14},
                {type: EMOJI_TYPE, val: app.img.common_go, width: 14, height: 14},
                {type: ENGLISH_TYPE, val: 'a', width: 10, height: 14},
                {type: CHINESE_TYPE, val: '方', width: 14, height: 14},
                {type: EMOJI_TYPE, val: app.img.common_go, width: 14, height: 14},
                {type: ENGLISH_TYPE, val: 'a', width: 10, height: 14},
                {type: CHINESE_TYPE, val: '方', width: 14, height: 14},
                {type: EMOJI_TYPE, val: app.img.common_go, width: 14, height: 14},
                {type: ENGLISH_TYPE, val: 'a', width: 10, height: 14},
                {type: CHINESE_TYPE, val: '方', width: 14, height: 14},
                {type: EMOJI_TYPE, val: app.img.common_go, width: 14, height: 14},
                {type: ENGLISH_TYPE, val: 'a', width: 10, height: 14},
                {type: CHINESE_TYPE, val: '方', width: 14, height: 14},
                {type: EMOJI_TYPE, val: app.img.common_go, width: 14, height: 14},
                {type: END_TYPE, width: 10, height: 14},
            ],
        };
    },
    onWordFocus(i) {
        const {wordsList} = this.state;
        wordsList.forEach((item)=>item.focus = false);
        wordsList[i].focus = true;
        this.setState({wordsList});
    },
    showInputPanelContent(lineHeight, fontSize) {
        const {wordsList} = this.state;
        const MAX_WIDTH = sr.rws(sr.w-60);
        let width = 0, showList = [], array = [];
        for (var i in wordsList) {
            var item = wordsList[i];
            item.index = i;
            width += item.width + 2;
            // console.log(width, MAX_WIDTH);
            if (width >= MAX_WIDTH) {
                showList.push(array);
                width = item.width;
                array = []
            }
            array.push(item);
        }
        showList.push(array);
        console.log(showList);
        return showList.map((array, i)=>{
            return (
                <View key={i} style={[styles.row, {height: lineHeight}]}>
                    {array.map((item, j)=><WordItem item={item} fontSize={fontSize} key={j} onFocus={this.onWordFocus}/>)}
                </View>
            )
        });
    },
    render() {
        var
        lineHeight= 14*2,
        fontSize= 14;
        return (
            <View style={styles.container}>
                <View style={[styles.inputPanel, {width:308}]}>
                    <ScrollView>
                        {this.showInputPanelContent(lineHeight, fontSize)}
                    </ScrollView>
                </View>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputPanel: {
        height: 140,
        width: sr.w-60,
        backgroundColor: '#FFFFFF',
    },
    row: {
        flexDirection: 'row',
    },
    emojiKeyboard: {
        width: sr.w,
        backgroundColor: '#CFCFCF',
        position: 'absolute',
        bottom: 0,
    },
    emojiKeyboardRow: {
        height: 60,
        flexDirection: 'row',
    },
    emojiKeyboardItem: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderWidth: 1,
        borderColor: '#AAAAAA',
    },
});
