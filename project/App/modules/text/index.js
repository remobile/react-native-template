'use strict';

var React = require('react');
var ReactNative = require('react-native');

var {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    Keyboard,
    ScrollView,
    Animated,
    TouchableOpacity,
    PanResponder,
    Platform,
    ListView,
} = ReactNative;

const dismissKeyboard = require('dismissKeyboard');
const EmojiKeyboard = require('./EmojiKeyboard.js');
const MorePanel = require('./MorePanel.js');
const LetterWidth = require('./LetterWidth.js');
const MessageList = require('./MessageList.js');
const images = require('./expressions').images;
const audioIcon = require('./img/audio.png');
const moreIcon = require('./img/more.png');
const emojiIcon = require('./img/emoji.png');
const keyboardIcon = require('./img/keyboard.png');

const
NO_KEYBOARD_TYPE = 0,
SYSTEM_KEYBOARD_TYPE = 1,
EMOJI_KEYBOARD_TYPE = 2,
AUDIO_KEYBOARD_TYPE = 3,
MORE_KEYBOARD_TYPE = 4;

const
TEXT_TYPE = 0,
EMOJI_TYPE = 1,
NEW_LINE_TYPE = 2,
END_TYPE = 3;

const UN_SELECTION =  {start: -1, end: -1};
const INIT_SELECTION =  {start: 0, end: 0};

var FocusLine = React.createClass({
    getDefaultProps() {
        return {
            blinkSpeed: 400,
        };
    },
    getInitialState() {
        return {
            opacity: new Animated.Value(1)
        };
    },
    componentDidMount() {
        this.blink();
    },
    blink() {
        const {blinkSpeed} = this.props;
        Animated.sequence([
            Animated.timing(this.state.opacity, {
                toValue: 0.2,
                duration: blinkSpeed
            }),
            Animated.timing(this.state.opacity, {
                toValue: 1,
                duration: blinkSpeed,
                delay: blinkSpeed
            })
        ]).start(() => {
            this.blink();
        });
    },
    render() {
        const {lineHeight} = this.props;
        const {opacity} = this.state;
        return (
            <Animated.View style={{width:1, height:lineHeight, opacity, backgroundColor: 'black', position:'absolute', left:0, top: 0}}/>
        )
    }
});

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
        const {item, lineHeight, fontSize} = this.props;
        const {type, val, width, selected} = item;
        const height = fontSize;
        if (type===END_TYPE || type===NEW_LINE_TYPE) {
            return (
                <View style={[styles.zeroLineContainer, {height:lineHeight}]} {...this._panResponder.panHandlers}>
                    {selected && <FocusLine lineHeight={lineHeight}/>}
                </View>
            )
        } else {
            return (
                <View style={[styles.lineContainer, {width: width, height:lineHeight}]} {...this._panResponder.panHandlers}>
                    {
                        type===EMOJI_TYPE ?
                        <Image resizeMode='stretch' source={images[val]} style={{width:fontSize, height:fontSize}} />
                        :
                        <Text style={{fontSize}}>{val}</Text>
                    }
                    {selected && <FocusLine lineHeight={lineHeight}/>}
                </View>
            )
        }
    }
});

module.exports = React.createClass({
    getDefaultProps() {
        const SIZE = 14;
        return {
            lineHeight: SIZE*1.5,
            fontSize: SIZE,
            maxLines: 3,
            keyboardType: 'default',
        };
    },
    getInitialState() {
        const {lineHeight} = this.props;
        this.wordsList = [
            {type: END_TYPE, width: 10},
        ];
        this.lastSelection = UN_SELECTION;
        this.selection = UN_SELECTION;
        this.lettersWidth = {};
        return {
            showList: this.getShowList(),
            assistText: '',
            keyboardShowType: NO_KEYBOARD_TYPE,
            inputHeight: lineHeight,
            isTextEmpty: true,
            keyboardHeight: 216,
        };
    },
    componentWillMount() {
        if (Platform.OS === 'ios') {
            this.subscriptions = [
                Keyboard.addListener('keyboardWillChangeFrame', this.onKeyboardChange),
            ];
        } else {
            this.subscriptions = [
                Keyboard.addListener('keyboardDidShow', this.onKeyboardChange),
            ];
        }
    },
    onKeyboardChange(e) {
        if (e) {
            this.subscriptions.forEach((sub) => sub.remove());
            this.setState({keyboardHeight: e.endCoordinates ? e.endCoordinates.height : e.end.height});
        }
    },
    clear() {
        const {lineHeight} = this.props;
        this.wordsList = [
            {type: END_TYPE, width: 10},
        ];
        this.lastSelection = UN_SELECTION;
        this.selection = {start:0, end: 0};
        this.setState({
            showList: this.getShowList(),
            inputHeight: lineHeight,
            isTextEmpty: true,
        });
    },
    setLetterWidth(key, width) {
        this.lettersWidth[key] = width;
    },
    getTextWidth(char, charCode) {
        const {fontSize} = this.props;
        const isChinese = (charCode===undefined ? char.charCodeAt(0) : charCode)  > 256;
        return isChinese ? fontSize : this.lettersWidth[char] ? this.lettersWidth[char] : fontSize;
    },
    getEmojiWidth() {
        const {fontSize} = this.props;
        return fontSize+2;
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
    addTextFromSelected(val, charCode) {
        const {start, end} = this.selection;
        const newStart = start+1, length = end-start;
        const width = this.getTextWidth(val, charCode);
        this.wordsList.splice(start, length, {type: TEXT_TYPE, val, width});
        this.selection = {start:newStart, end:newStart};
        this.updateShowList();
    },
    addImageFromSelected(index) {
        const {start, end} = this.selection;
        const {fontSize} = this.props;
        const newStart = start+1, length = end-start;

        this.wordsList.splice(start, length, {type: EMOJI_TYPE, val:index, width:this.getEmojiWidth()});
        this.selection = {start:newStart, end:newStart};
        this.updateShowList();
    },
    addNewLineFromSelected() {
        const {start, end} = this.selection;
        const newStart = start+1, length = end-start;
        this.wordsList.splice(start, length, {type: NEW_LINE_TYPE});
        this.selection = {start:newStart, end:newStart};
        this.updateShowList();
    },
    scrollToSelected() {
        const {maxLines, lineHeight} = this.props;
        const {selectedRow, maxRows} = this;
        if (selectedRow === 0) {
            this.inputScroll.scrollTo({y: 0});
        } else if (maxRows+1 >= maxLines) {
            if (maxRows-selectedRow+1 >= maxLines) {
                this.inputScroll.scrollTo({y: (selectedRow-Math.floor((maxLines-1)/2))*lineHeight});
            } else {
                this.inputScroll.scrollTo({y: (selectedRow-(maxLines-(maxRows-selectedRow+1)))*lineHeight});
            }
        }
    },
    onWordFocus(i) {
        this.selection = {start:i, end:i};
        this.setState({keyboardShowType: SYSTEM_KEYBOARD_TYPE, showList: this.getShowList()}, ()=>{
            setTimeout(()=>{
                this.assistInput.focus();
            }, 10);
        });
        this.scrollToSelected();
    },
    updateShowList() {
        this.setState({showList: this.getShowList(), isTextEmpty: this.wordsList.length === 1});
    },
    getShowList() {
        const {wordsList, selection} = this;
        const {start, end} = selection;
        let width = 0, list = [], array = [];
        var row = 0,  col = 0;
        for (let i in wordsList) {
            let item = wordsList[i];
            let index = i*1;
            let selected = (index>=start&&index<=end);
            item.index = index;
            item.selected = selected;
            if (selected) {
                this.selectedRow = row;
            }
            item.row = row;
            item.col = col;
            if (item.type === NEW_LINE_TYPE) {
                array.push(item);
                list.push(array);
                width = 0;
                array = [];
                row++;
                col = 0;
            } else {
                width += item.width;
                if (width >= this.MAX_WIDTH) {
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
        this.maxRows = row;
        return list;
    },
    showInputPanelContent() {
        const {lineHeight, fontSize} = this.props;
        const {showList} = this.state;
        return showList.map((array, i)=>{
            return (
                <View key={i} style={[styles.inputRow, {height: lineHeight}]}>
                    {array.map((item, j)=><WordItem key={j} item={item} lineHeight={lineHeight} fontSize={fontSize} onFocus={this.onWordFocus}/>)}
                </View>
            )
        });
    },
    onChangeText(text) {
        this.setState({assistText: ''});
        text = text.substr(text.length-1);
        const charCode = text.charCodeAt(0);
        if (charCode === 10) {
            this.addNewLineFromSelected();
        } else {
            this.addTextFromSelected(text, charCode);
        }
    },
    onKeyPress(e) {
        const {key} = e.nativeEvent;
        if (key === 'Backspace') {
            this.deleteFromSelected();
        }
    },
    onEmojiPress(index) {
        this.addImageFromSelected(index);
    },
    onMenuPress(index) {
        Toast(index+'');
    },
    onPressDelete() {
        this.deleteFromSelected();
    },
    onEmojiKeyboardMounted(mounted) {
        this.emojiKeyboardMounted = mounted;
    },
    switchKeyboard() {
        const {keyboardShowType} = this.state;
        switch (keyboardShowType) {
            case NO_KEYBOARD_TYPE:
            this.showEmojiKeyboard();
            break;
            case EMOJI_KEYBOARD_TYPE:
            this.showSystemKeyboard(true);
            break;
            case MORE_KEYBOARD_TYPE:
            this.showEmojiKeyboard();
            break;
            default:
            this.showEmojiKeyboard(true);
        }
    },
    switchAudioAndInput() {
        let {keyboardShowType} = this.state;
        if (keyboardShowType===AUDIO_KEYBOARD_TYPE) {
            this.showSystemKeyboard();
        } else if (keyboardShowType===SYSTEM_KEYBOARD_TYPE || keyboardShowType===EMOJI_KEYBOARD_TYPE) {
            this.hideKeyboard(AUDIO_KEYBOARD_TYPE);
        } else {
            this.setState({keyboardShowType: AUDIO_KEYBOARD_TYPE});
        }
    },
    startRecordAudio() {

    },
    stopRecordAudio() {

    },
    parseWordsListFromText(text) {
        const {fontSize, lineHeight} = this.props;
        const textStyle = {style:{fontSize}};
        const rowStyle = {style:{lineHeight:lineHeight}};
        const emojiStyle = {style:{width:fontSize, height:fontSize, marginHorizontal:1, alignSelf:'center'}};
        let rows = [], line = [];
        let hasEscapeStart = false, escapeText = '';
        for(var i = 0, len = text.length; i < len; i++) {
            let char = text.charAt(i);
            if (char === '\n') {
                rows.push(<Text key={i} {...rowStyle}>{line.length?line:[<Text {...textStyle} />]}</Text>);
                line = [];
            } else if (char === ':') {
                if (!hasEscapeStart) {
                    hasEscapeStart = true;
                } else {
                    if (!escapeText) {
                        line.push(<Text key={i} {...textStyle}>:</Text>);
                    } else {
                        line.push(<Image key={i} resizeMode='stretch' source={images[escapeText]} {...emojiStyle} />);
                    }
                    hasEscapeStart = false;
                    escapeText = '';
                }
            } else {
                if (hasEscapeStart) {
                    escapeText += char;
                } else {
                    line.push(<Text key={i} {...textStyle}>{char}</Text>);
                }
            }
        }
        rows.push(<Text key={i} {...rowStyle}>{line.length?line:[<Text {...textStyle} />]}</Text>);

        return rows;
    },
    getTextFromWordsList(wordsList) {
        let text = '';
        for (let i in wordsList) {
            let item = wordsList[i];
            if (item.type === EMOJI_TYPE) {
                text += ':'+item.val+':';
            } else if (item.type === NEW_LINE_TYPE) {
                text += '\n';
            } else if (item.type === TEXT_TYPE) {
                if (item.val === ':') {
                    text += '::';
                } else {
                    text += item.val;
                }
            }
        }
        return text;
    },
    sendTextMessage() {
        const text = this.getTextFromWordsList(this.wordsList);
        if (!text) {
            Toast('不能发送空消息');
            return;
        }
        this.clear();
        this.messageList.sendMessage({type:'text', text});
    },
    showMorePanel() {
        let {keyboardShowType} = this.state;
        if (keyboardShowType === MORE_KEYBOARD_TYPE) {
            this.showSystemKeyboard();
        } else if (keyboardShowType === SYSTEM_KEYBOARD_TYPE || keyboardShowType === EMOJI_KEYBOARD_TYPE) {
            this.hideKeyboard(MORE_KEYBOARD_TYPE);
        } else {
            this.setState({keyboardShowType:MORE_KEYBOARD_TYPE});
        }
    },
    showSystemKeyboard(fromEmojiKeyboard) {
        this.assistInput.focus();
        if (fromEmojiKeyboard) {
            this.setState({keyboardShowType: SYSTEM_KEYBOARD_TYPE});
        } else {
            this.selection = _.isEqual(this.lastSelection, UN_SELECTION) ? INIT_SELECTION : this.lastSelection;
            this.setState({keyboardShowType: SYSTEM_KEYBOARD_TYPE, showList: this.getShowList()});
        }
    },
    showEmojiKeyboard(fromSystemKeyboard) {
        if (fromSystemKeyboard) {
            this.setState({keyboardShowType: EMOJI_KEYBOARD_TYPE});
            dismissKeyboard();
        } else {
            this.selection = _.isEqual(this.lastSelection, UN_SELECTION) ? INIT_SELECTION : this.lastSelection;
            this.setState({keyboardShowType: EMOJI_KEYBOARD_TYPE, showList: this.getShowList()});
        }
    },
    hideKeyboard(nextKeyboardShowType=NO_KEYBOARD_TYPE) {
        let {keyboardShowType} = this.state;
        if (keyboardShowType === SYSTEM_KEYBOARD_TYPE || keyboardShowType === EMOJI_KEYBOARD_TYPE) {
            this.lastSelection = this.selection;
            this.selection = UN_SELECTION;
            this.setState({keyboardShowType:nextKeyboardShowType, showList: this.getShowList()});
            if (keyboardShowType === SYSTEM_KEYBOARD_TYPE) {
                dismissKeyboard();
            }
        } else if (keyboardShowType===MORE_KEYBOARD_TYPE) {
            this.setState({keyboardShowType:nextKeyboardShowType});
        }
    },
    onContentSizeChange(contentWidth, contentHeight) {
        const {lineHeight, fontSize, maxLines} = this.props;
        const {inputHeight} = this.state;
        const maxHeight = maxLines*lineHeight;
        if (inputHeight !== contentHeight && inputHeight <= maxHeight) {
            this.setState({inputHeight: Math.min(contentHeight, maxHeight)});
        }
        this.scrollToSelected();
    },
    onLayout(e) {
        var {width} = e.nativeEvent.layout;
        this.MAX_WIDTH = width;
    },
    render() {
        let {assistText, inputHeight, keyboardShowType, isTextEmpty, keyboardHeight} = this.state;
        const {keyboardType} = this.props;
        return (
            <View style={{flex: 1}}>
                <View style={{flex:1}} >
                    <MessageList
                        ref={(ref)=>this.messageList = ref}
                        parseWordsListFromText={this.parseWordsListFromText}
                        hideKeyboard={this.hideKeyboard}
                        />
                </View>
                <View style={styles.container}>
                    <TouchableOpacity onPress={this.switchAudioAndInput}>
                        <Image resizeMode='stretch' source={keyboardShowType===AUDIO_KEYBOARD_TYPE?keyboardIcon: audioIcon} style={styles.iconButton} />
                    </TouchableOpacity>
                    {
                        keyboardShowType===AUDIO_KEYBOARD_TYPE ?
                        <View style={styles.audioContainer}>
                            <TouchableOpacity onPress={this.startRecordAudio} style={styles.audioInnerContainer}>
                                <Text>按住 说话</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.inputContainer}>
                            <View style={{flex:1, height: inputHeight}} onLayout={this.onLayout}>
                                <ScrollView
                                    ref={(ref)=>this.inputScroll = ref}
                                    keyboardShouldPersistTaps={true}
                                    onContentSizeChange={this.onContentSizeChange}
                                    >
                                    {this.showInputPanelContent()}
                                </ScrollView>
                            </View>
                            <TouchableOpacity onPress={this.switchKeyboard}>
                                <Image resizeMode='stretch' source={keyboardShowType===EMOJI_KEYBOARD_TYPE?keyboardIcon:emojiIcon} style={styles.iconButtonRight} />
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={styles.rightContainer}>
                        {
                            !isTextEmpty &&  (keyboardShowType!==AUDIO_KEYBOARD_TYPE && keyboardShowType!==MORE_KEYBOARD_TYPE )?
                            <TouchableOpacity style={styles.sendContainer}  onPress={this.sendTextMessage}>
                                <Text style={styles.send}>发送</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={this.showMorePanel}>
                                <Image resizeMode='stretch' source={moreIcon} style={styles.innerIconButton} />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={styles.makeupContainer}>
                    {keyboardShowType!==AUDIO_KEYBOARD_TYPE && <View style={[styles.line,
                        keyboardShowType===SYSTEM_KEYBOARD_TYPE||keyboardShowType===EMOJI_KEYBOARD_TYPE?{backgroundColor: 'green'}:{backgroundColor: '#C2BFC3'}]} />}
                    <TextInput
                        ref={(ref)=>this.assistInput = ref}
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType={keyboardType}
                        style={styles.assistInput}
                        onChangeText={this.onChangeText}
                        onKeyPress={this.onKeyPress}
                        value={assistText}
                        multiline
                        />
                    {
                        (keyboardShowType!==NO_KEYBOARD_TYPE && keyboardShowType!==AUDIO_KEYBOARD_TYPE && keyboardShowType!==MORE_KEYBOARD_TYPE) &&
                        <EmojiKeyboard
                            isBlank={keyboardShowType===SYSTEM_KEYBOARD_TYPE&&!this.emojiKeyboardMounted}
                            onEmojiPress={this.onEmojiPress}
                            onPressDelete={this.onPressDelete}
                            onMounted={this.onEmojiKeyboardMounted}
                            keyboardHeight={keyboardHeight}
                            />
                    }
                    {
                        keyboardShowType===MORE_KEYBOARD_TYPE &&
                        <MorePanel onMenuPress={this.onMenuPress} keyboardHeight={keyboardHeight}/>
                    }
                </View>
                <LetterWidth setLetterWidth={this.setLetterWidth}/>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 10,
        alignItems: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: '#CCCCCC',
    },
    audioContainer: {
        flex: 1,
        height: 30,
        borderWidth: 1,
        borderColor: '#AAAAAA',
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
    },
    audioInnerContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    line: {
        marginTop: 4,
        height: 1,
        marginLeft: 50,
        marginRight: 105,
    },
    assistInput: {
        top: -20,
    },
    zeroLineContainer: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        overflow:'hidden',
    },
    lineContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        overflow:'hidden',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        width: 30,
        height: 30,
        marginHorizontal: 10,
    },
    iconButtonRight: {
        width: 30,
        height: 30,
        marginLeft: 10,
        marginRight: 5,
    },
    innerIconButton: {
        width: 30,
        height: 30,
    },
    rightContainer: {
        width: 55,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendContainer: {
        width: 46,
        height: 30,
        backgroundColor: '#29A220',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    send: {
        fontSize: 14,
        color: '#FFFFFF',
    },
    makeupContainer: {
        marginBottom: 10,
    },
});
