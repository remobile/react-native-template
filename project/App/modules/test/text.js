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
NO_KEYBOARD_TYPE = 0,
SYSTEM_KEYBOARD_TYPE = 1,
EMOJI_KEYBOARD_TYPE = 2;

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
                this.props.onFocus(this.props.item.index);
            },
        });
    },
    render() {
        const {item, fontSize, focus} = this.props;
        const {type, val, width, height} = item;
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
            assistText: '',
            keyboardType: NO_KEYBOARD_TYPE,
            selection: {},
            wordsList: [
                {type: ENGLISH_TYPE, val: '1', width: 10, height: 14},
                {type: ENGLISH_TYPE, val: '2', width: 10, height: 14},
                {type: ENGLISH_TYPE, val: '3', width: 10, height: 14},
                {type: ENGLISH_TYPE, val: '4', width: 10, height: 14},
                {type: ENGLISH_TYPE, val: 'a', width: 10, height: 14},
                {type: CHINESE_TYPE, val: '方', width: 14, height: 14},
                {type: EMOJI_TYPE, val: app.img.common_go, width: 14, height: 14},
                {type: END_TYPE, width: 10, height: 14},
            ],
        };
    },
    switchKeyboard() {
        const {keyboardType} = this.state;
        if (keyboardType === NO_KEYBOARD_TYPE) {
            this.setState({keyboardType: EMOJI_KEYBOARD_TYPE});
            dismissKeyboard();
        } else if (keyboardType === EMOJI_KEYBOARD_TYPE) {
            this.setState({keyboardType: SYSTEM_KEYBOARD_TYPE});
            this.assistInput.focus();
        } else {
            this.setState({keyboardType: EMOJI_KEYBOARD_TYPE});
            dismissKeyboard();
        }
    },
    deleteFromSelected() {
        const {wordsList, selection} = this.state;
        const {start, end} = selection;
        const newStart = start-1, length = end-start;
        if (!length && newStart>=0) {
            wordsList.splice(newStart, 1);
            this.setState({wordsList, selection:{start:newStart, end:newStart}});
        } else if (length > 0) {
            wordsList.splice(start, length);
            this.setState({wordsList, selection:{start:start, end:start}});
        }
    },
    addFromSelected(key) {
        const {wordsList, selection} = this.state;
        const {start, end} = selection;
        const newStart = start+1, length = end-start;
        const item = {type: ENGLISH_TYPE, val: key, width: 10, height: 14};
        if (length > 0) {
            wordsList.splice(start, length, item);
            this.setState({wordsList, selection:{start:newStart, end:newStart}});
        } else {
            wordsList.splice(start, 0, item);
            this.setState({wordsList, selection:{start:newStart, end:newStart}});
        }
    },
    onWordFocus(i) {
        this.setState({keyboardType: SYSTEM_KEYBOARD_TYPE, selection:{start:i, end:i}});
        this.assistInput.focus();
    },
    showInputPanelContent(lineHeight, fontSize) {
        const {wordsList, selection} = this.state;
        const {start, end} = selection;
        const MAX_WIDTH = sr.rws(sr.w-60);
        let width = 0, showList = [], array = [];
        for (var i in wordsList) {
            var item = wordsList[i];
            item.index = i*1;
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
        return showList.map((array, i)=>{
            return (
                <View key={i} style={[styles.inputRow, {height: lineHeight}]}>
                    {array.map((item, j)=><WordItem key={j} focus={item.index>=start&&item.index<=end} item={item} fontSize={fontSize} onFocus={this.onWordFocus}/>)}
                </View>
            )
        });
    },
    onChangeText(text) {
        this.setState({assistText: text});
    },
    onKeyPress(e) {
        const {key} = e.nativeEvent;
        if (key === 'Backspace') {
            this.deleteFromSelected();
        } else {
            this.addFromSelected(key);
        }
    },
    render() {
        var
        lineHeight= 14*2,
        fontSize= 14;
        const {assistText} = this.state;
        return (
            <View style={styles.container}>
                <TextInput
                    ref={(ref)=>this.assistInput = ref}
                    autoCorrect={false}
                    style={styles.assistInput}
                    onChangeText={this.onChangeText}
                    onKeyPress={this.onKeyPress}
                    value={assistText}
                    />
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
        height: 40,
        width: sr.w-60,
        backgroundColor: '#FFFFFF',
    },
    assistInput: {
        height: 40,
        width: sr.w-60,
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
    },
    inputRow: {
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
