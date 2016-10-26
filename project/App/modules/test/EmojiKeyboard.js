'use strict';

var React = require('react');
var ReactNative = require('react-native');

var {
    StyleSheet,
    View,
    TouchableOpacity,
} = ReactNative;

module.exports = React.createClass({
    onKeyboardPress(num) {
        this.props.onKeyboardPress(num);
    },
    render() {
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
    }
});


var styles = StyleSheet.create({
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
