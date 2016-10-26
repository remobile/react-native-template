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
const EmojiKeyboard = require('./EmojiKeyboard.js');

const
NO_KEYBOARD_TYPE = 0,
SYSTEM_KEYBOARD_TYPE = 1,
EMOJI_KEYBOARD_TYPE = 2;

const
ENGLISH_TYPE = 0,
CHINESE_TYPE = 1,
EMOJI_TYPE = 2,
NEW_LINE_TYPE = 3,
END_TYPE = 4;

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
        const {item, fontSize} = this.props;
        const {type, val, width, height, selected} = item;
        if (type===END_TYPE) {
            return (
                <View style={{flex:1, height, flexDirection: 'row', backgroundColor:'red'}} {...this._panResponder.panHandlers}>
                    <View style={{marginLeft: 1, width:1, height, backgroundColor: selected?'black':'transparent'}}/>
                </View>
            )
        } else if (type===NEW_LINE_TYPE) {
            return (
                <View style={{flex:1, height, flexDirection: 'row'}} {...this._panResponder.panHandlers}>
                    <View style={{marginLeft: 1, width:1, height, backgroundColor: selected?'black':'transparent'}}/>
                </View>
            )
        } else {
            return (
                <View style={{width: width+2, height, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} {...this._panResponder.panHandlers}>
                    <View style={{width:1, height, marginRight: 1, backgroundColor: selected?'black':'transparent'}}/>
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
    getDefaultProps() {
        const SIZE = 14;
        return {
            lineHeight: SIZE*1.5,
            fontSize: SIZE,
            maxLines: 3,
        };
    },
    getInitialState() {
        const {lineHeight} = this.props;
        this.wordsList = [
            {type: END_TYPE, width: 10, height: 14},
        ];
        this.selection = {start: 0, end: 0};
        return {
            showList: this.getShowList(),
            assistText: '',
            keyboardType: NO_KEYBOARD_TYPE,
            inputHeight: this.getInputContainerHeight(lineHeight),
        };
    },
    getInputContainerHeight(height) {
        return height;
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
        const {start, end} = this.selection;
        const newStart = start-1, length = end-start;
        if (!length && newStart>=0) {
            this.wordsList.splice(newStart, 1);
            this.selection = {start:newStart, end:newStart};
            this.updateShowList();
        } else if (length > 0) {
            this.wordsList.splice(start, length);
            this.selection = {start:start, end:start};
            this.updateShowList();
        }
    },
    addFromSelected(key) {
        const {start, end} = this.selection;
        const newStart = start+1, length = end-start;
        this.wordsList.splice(start, length, {type: ENGLISH_TYPE, val: key, width: 10, height: 14});
        this.selection = {start:newStart, end:newStart};
        this.updateShowList();
    },
    addNewLineFromSelected() {
        const {start, end} = this.selection;
        const newStart = start+1, length = end-start;
        this.wordsList.splice(start, length, {type: NEW_LINE_TYPE, height: 14});
        this.selection = {start:newStart, end:newStart};
        this.updateShowList();
    },
    scrollToSelected() {
        // const {wordsList, selection} = this.state;
        // const {start} = selection;
        // const curItem = wordsList[start];
        // console.log(curItem);
    },
    onWordFocus(i) {
        this.selection = {start:i, end:i};
        this.setState({keyboardType: SYSTEM_KEYBOARD_TYPE, showList: this.getShowList()});
        this.assistInput.focus();
    },
    updateShowList() {
        this.setState({showList: this.getShowList()});
    },
    getShowList() {
        const MAX_WIDTH = sr.rws(sr.w-60);
        const {wordsList, selection} = this;
        const {start, end} = selection;
        let width = 0, list = [], array = [];
        var row = 0,  col = 0;
        for (let i in wordsList) {
            let item = wordsList[i];
            let index = i*1;
            item.index = index;
            item.selected = (index>=start&&index<=end)
            item.row = row;
            item.col = col;
            // console.log(width, MAX_WIDTH);
            if (item.type === NEW_LINE_TYPE) {
                array.push(item);
                list.push(array);
                width = 0;
                array = [];
                row++;
                col = 0;
            } else {
                width += item.width + 2;
                if (width >= MAX_WIDTH) {
                    list.push(array);
                    width = item.width;
                    array = [];
                    row++;
                    col = 0;
                }
                array.push(item);
                col++;
            }
        }
        list.push(array);
        return list;
    },
    showInputPanelContent() {
        const {lineHeight, fontSize} = this.props;
        const {showList} = this.state;
        console.log("====================", showList);
        return showList.map((array, i)=>{
            return (
                <View key={i} style={[styles.inputRow, {height: lineHeight}]}>
                    {array.map((item, j)=><WordItem key={j} item={item} fontSize={fontSize} onFocus={this.onWordFocus}/>)}
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
        } else if (key === 'Enter') {
            this.addNewLineFromSelected(key);
        } else {
            this.addFromSelected(key);
        }
    },
    onContentSizeChange(contentWidth, contentHeight) {
        const {lineHeight, fontSize} = this.props;
        contentHeight = this.getInputContainerHeight(contentHeight);
        const {inputHeight} = this.state;
        // if () {
        //
        // }
    },
    render() {
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
                <View style={styles.inputPanel}>
                    <ScrollView
                        ref={(ref)=>this.inputScroll = ref}
                        onContentSizeChange={this.onContentSizeChange}
                        >
                        {this.showInputPanelContent()}
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
        height: 30,
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
        alignItems: 'center',
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
