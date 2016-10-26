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
const moreIcon = require('./img/more.png');
const emojiIcon = require('./img/emoji.png');
const keyboardIcon = require('./img/keyboard.png');

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
        this.selection = {start: 0, end: 0};
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
        this.selection = {start: 0, end: 0};
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
                this.setState({keyboardShowType: EMOJI_KEYBOARD_TYPE});
                dismissKeyboard();
                break;
            case EMOJI_KEYBOARD_TYPE:
                this.setState({keyboardShowType: SYSTEM_KEYBOARD_TYPE});
                this.assistInput.focus();
                break;
            default:
                this.setState({keyboardShowType: EMOJI_KEYBOARD_TYPE});
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
        const MAX_WIDTH = sr.ws(sr.w-110);
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
        const charCode = text.charCodeAt(0);
        const isChinese = charCode > 256;
        if (charCode === 10) {
            this.addNewLineFromSelected();
        } else {
            this.addTextFromSelected(text, isChinese);
        }
        this.setState({assistText: ''});
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
    showMorePanel() {
    },
    hideKeyboard() {
        const {keyboardShowType} = this.state;
        this.setState({keyboardShowType: NO_KEYBOARD_TYPE});
        dismissKeyboard();
    },
    switchKeyboard() {
        const {keyboardShowType} = this.state;
        this.switchKeyboardPress = true;
        if (keyboardShowType === NO_KEYBOARD_TYPE) {
            this.setState({keyboardShowType: EMOJI_KEYBOARD_TYPE});
            dismissKeyboard();
        } else if (keyboardShowType === EMOJI_KEYBOARD_TYPE) {
            this.setState({keyboardShowType: SYSTEM_KEYBOARD_TYPE});
            this.assistInput.focus();
        } else {
            this.setState({keyboardShowType: EMOJI_KEYBOARD_TYPE});
            dismissKeyboard();
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
    render() {
        const {assistText, inputHeight, keyboardShowType} = this.state;
        const {keyboardType} = this.props;

        keyboardShowType!==NO_KEYBOARD_TYPE
        return (
            <View>
                <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={this.showMorePanel}>
                        <Image resizeMode='stretch' source={moreIcon} style={styles.iconButton} />
                    </TouchableOpacity>
                    <View style={[styles.inputBox, {height: inputHeight}]}>
                        <ScrollView
                            ref={(ref)=>this.inputScroll = ref}
                            onContentSizeChange={this.onContentSizeChange}
                            >
                            {this.showInputPanelContent()}
                        </ScrollView>
                    </View>
                    <TouchableOpacity onPress={this.switchKeyboard}>
                        <Image resizeMode='stretch' source={keyboardShowType===EMOJI_KEYBOARD_TYPE?keyboardIcon:emojiIcon} style={styles.iconButton} />
                    </TouchableOpacity>
                </View>
                <View style={styles.makeupContainer}>
                    <View style={styles.line} />
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
                            keyboardShowType!==NO_KEYBOARD_TYPE &&
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
    inputContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        alignItems: 'flex-end',
    },
    inputBox: {
        width: sr.w - 100,
    },
    line: {
        width: sr.w - 100,
        marginTop: 4,
        marginLeft: 50,
        height: 1,
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
        justifyContent: 'flex-end',
    },
    makeupContainer: {
        marginBottom: 10,
    },
});
