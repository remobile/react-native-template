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
    TouchableOpacity,
    PanResponder,
} = ReactNative;

var SplashScreen = require('@remobile/react-native-splashscreen');
var Button = require('@remobile/react-native-simple-button');
import  Swipeout  from 'react-native-swipe-out';
var EmojiKeyboard = require('./EmojiKeyboard.js');
const dismissKeyboard = require('dismissKeyboard');

const
NO_KEYBOARD_TYPE = 0,
SYSTEM_KEYBOARD_TYPE = 1,
EMOJI_KEYBOARD_TYPE = 2;

module.exports = React.createClass({
    componentWillMount() {
        SplashScreen.hide();
        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (e, gestureState) => true,
            onStartShouldSetPanResponderCapture: (e, gestureState) => true,
            onMoveShouldSetPanResponder: (e, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (e, gestureState) => true,
            onPanResponderGrant: (e, gestureState) => {
                const {locationX, locationY} = e.nativeEvent;
                console.log("======= onPanResponderGrant", locationX, locationY);
            },
            onPanResponderMove: (e, gestureState) => {
                console.log("======= onPanResponderMove");
                console.log(e, gestureState);
            },
            onPanResponderTerminationRequest: (e, gestureState) => true,
            onPanResponderRelease: (e, gestureState) => {
                const {locationX, locationY} = e.nativeEvent;
                console.log("======= onPanResponderGrant", locationX, locationY);
            },
        });
    },
    getInitialState() {
        return {
            selection:{start:0, end: 0},
            text: '方运江',
            keyboardType: NO_KEYBOARD_TYPE,
            fontSize: 14,
        };
    },
    switchKeyboard() {
        const {keyboardType} = this.state;
        this.switchKeyboardPress = true;
        if (keyboardType === NO_KEYBOARD_TYPE) {
            this.setState({keyboardType: EMOJI_KEYBOARD_TYPE});
            dismissKeyboard();
        } else if (keyboardType === EMOJI_KEYBOARD_TYPE) {
            this.setState({keyboardType: SYSTEM_KEYBOARD_TYPE});
            this.contentInput.focus();
        } else {
            this.setState({keyboardType: EMOJI_KEYBOARD_TYPE});
            dismissKeyboard();
        }
    },
    onBlur() {
        if (!this.switchKeyboardPress) {
            this.setState({keyboardType: NO_KEYBOARD_TYPE});
        } else {
            this.switchKeyboardPress = false;
        }
    },
    onKeyboardPress(num) {
        var {text, selection} = this.state;
        var {start, end} = selection;
        var newtext = text.substring(0, start)+num+text.substring(end);
        this.setState({text: newtext});
    },
    onChangeText(text) {
        this.setState({text});
    },
    onSelectionChange(e) {
        this.setState({selection: e.nativeEvent.selection});
    },
    EmojiKeyboard() {
        return (
            <View style={styles.emojiKeyboard}>
                <View style={styles.emojiKeyboardRow}>
                    <TouchableOpacity style={styles.emojiKeyboardItem} onPress={this.onKeyboardPress.bind(null, 1)}><Text>1</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.emojiKeyboardItem} onPress={this.onKeyboardPress.bind(null, 2)}><Text>2</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.emojiKeyboardItem} onPress={this.onKeyboardPress.bind(null, 3)}><Text>3</Text></TouchableOpacity>
                </View>
                <View style={styles.emojiKeyboardRow}>
                    <TouchableOpacity style={styles.emojiKeyboardItem} onPress={this.onKeyboardPress.bind(null, 4)}><Text>4</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.emojiKeyboardItem} onPress={this.onKeyboardPress.bind(null, 5)}><Text>5</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.emojiKeyboardItem} onPress={this.onKeyboardPress.bind(null, 6)}><Text>6</Text></TouchableOpacity>
                </View>
                <View style={styles.emojiKeyboardRow}>
                    <TouchableOpacity style={styles.emojiKeyboardItem} onPress={this.onKeyboardPress.bind(null, 7)}><Text>7</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.emojiKeyboardItem} onPress={this.onKeyboardPress.bind(null, 8)}><Text>8</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.emojiKeyboardItem} onPress={this.onKeyboardPress.bind(null, 9)}><Text>9</Text></TouchableOpacity>
                </View>
            </View>
        )
    },
    render() {
        const {keyboardType} = this.state;
        return (
            <View style={styles.container}>
                <Button onPress={this.switchKeyboard}>{keyboardType===EMOJI_KEYBOARD_TYPE?"系统键盘":"emoji键盘"}{keyboardType}</Button>
                <TextInput
                    ref={(ref)=>this.contentInput = ref}
                    autoCorrect={false}
                    style={styles.text_input}
                    value={this.state.text}
                    onSelectionChange={this.onSelectionChange}
                    onChangeText={this.onChangeText}
                    selection={this.state.selection}
                    onBlur={this.onBlur}
                    />
                <View style={styles.inputPanel} {...this._panResponder.panHandlers}>
                    "sadjhfasdljflskadfjslakdfjsaldkfjsladkjflksd".split('').map((letter, i)=>{
                        return (
                            <Text key={i}>
                                {letter}
                            </Text>
                        )
                    });
                </View>
                {keyboardType!==NO_KEYBOARD_TYPE && <this.EmojiKeyboard />}
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
    text_input: {
        position: 'absolute',
        left: -sr.w,
    },
    inputPanel: {
        height: 80,
        width: sr.w-60,
        backgroundColor: '#FFFFFF',
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
