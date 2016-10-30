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
    TouchableOpacity,
    PanResponder,
} = ReactNative;

const dismissKeyboard = require('dismissKeyboard');
const EmojiKeyboard = require('./EmojiKeyboard.js');
const FONT_SCALE = require('./FontScale.json');
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
ENGLISH_TYPE = 0,
CHINESE_TYPE = 1,
EMOJI_TYPE = 2,
NEW_LINE_TYPE = 3,
END_TYPE = 4;

const UN_SELECTION =  {start: -1, end: -1};
const INIT_SELECTION =  {start: 0, end: 0};

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
        if (type===END_TYPE) {
            return (
                <View style={[styles.zeroLineContainer, {height:lineHeight}]} {...this._panResponder.panHandlers}>
                    <View style={{marginLeft: 1, width:1, height, backgroundColor: selected?'black':'transparent'}}/>
                </View>
            )
        } else if (type===NEW_LINE_TYPE) {
            return (
                <View style={[styles.zeroLineContainer, {height:lineHeight}]} {...this._panResponder.panHandlers}>
                    <View style={{marginLeft: 1, width:1, height, backgroundColor: selected?'black':'transparent'}}/>
                </View>
            )
        } else {
            return (
                <View style={[styles.lineContainer, {width: width+2, height:lineHeight}]} {...this._panResponder.panHandlers}>
                    <View style={{width:1, height, marginRight: 1, backgroundColor: selected?'black':'transparent'}}/>
                    {
                        type===EMOJI_TYPE ?
                        <Image resizeMode='stretch' source={images[val]} style={{width, height:width}} />
                        :
                        <Text style={{fontSize}}>{val}</Text>
                    }
                </View>
            )
        }
    }
});

module.exports = React.createClass({
    getDefaultProps() {
        const SIZE = 14;
        return {
            lineHeight: SIZE*FONT_SCALE['lineHeight'],
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
        return {
            showList: this.getShowList(),
            assistText: '',
            keyboardShowType: NO_KEYBOARD_TYPE,
            inputHeight: lineHeight,
        };
    },
    clear() {
        this.wordsList = [
            {type: END_TYPE, width: 10},
        ];
        this.selection = UN_SELECTION;
        this.setState({
            showList: this.getShowList(),
            assistText: '',
            keyboardShowType: NO_KEYBOARD_TYPE,
            inputHeight: lineHeight,
        });
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
            default:
                this.showEmojiKeyboard(true);

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
    addTextFromSelected(val, isChinese) {
        const {start, end} = this.selection;
        const {fontSize} = this.props;
        const newStart = start+1, length = end-start;
        const fontScale = isChinese ? FONT_SCALE['chinese'] : FONT_SCALE[val] ? FONT_SCALE[val] : 1;
        const width = Math.ceil(fontScale*fontSize*1.1);

        this.wordsList.splice(start, length, {type: isChinese?CHINESE_TYPE:ENGLISH_TYPE, val, width});
        this.selection = {start:newStart, end:newStart};
        this.updateShowList();
    },
    addImageFromSelected(index) {
        const {start, end} = this.selection;
        const {fontSize} = this.props;
        const newStart = start+1, length = end-start;

        this.wordsList.splice(start, length, {type: EMOJI_TYPE, val:index, width:fontSize});
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
        this.setState({showList: this.getShowList()});
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
                width += item.width + 2;
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
        const isChinese = charCode > 256;
        if (charCode === 10) {
            this.addNewLineFromSelected();
        } else {
            this.addTextFromSelected(text, isChinese);
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
    onPressDelete() {
        this.deleteFromSelected();
    },
    onEmojiKeyboardMounted(mounted) {
        this.emojiKeyboardMounted = mounted;
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
    sendTextMessage() {

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
    hideKeyboard(keyboardShowType=NO_KEYBOARD_TYPE) {
        this.lastSelection = this.selection;
        this.selection = UN_SELECTION;
        this.setState({keyboardShowType, showList: this.getShowList()});
        dismissKeyboard();
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
        let {assistText, inputHeight, keyboardShowType, canSend} = this.state;
        const {keyboardType} = this.props;
        return (
            <View>
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
                            canSend ?
                            <TouchableOpacity onPress={this.sendTextMessage}>
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
                    {keyboardShowType!==AUDIO_KEYBOARD_TYPE && <View style={styles.line} />}
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
                            (keyboardShowType!==NO_KEYBOARD_TYPE && keyboardShowType!==AUDIO_KEYBOARD_TYPE) &&
                            <EmojiKeyboard
                                isBlank={keyboardShowType===SYSTEM_KEYBOARD_TYPE&&!this.emojiKeyboardMounted}
                                onEmojiPress={this.onEmojiPress}
                                onPressDelete={this.onPressDelete}
                                onMounted={this.onEmojiKeyboardMounted} />
                        }
                </View>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 10,
        alignItems: 'flex-end',
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
        backgroundColor: 'green',
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
    send: {
        fontSize: 18,
        fontWeight: '500',
        color: 'green',
    },
    makeupContainer: {
        marginBottom: 10,
    },
});
