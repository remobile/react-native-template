'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Animated,
    TextInput,
    Text,
    TouchableOpacity,
    Navigator,
} = ReactNative;

var dismissKeyboard = require('dismissKeyboard');

var {Button} = COMPONENTS;

module.exports = React.createClass({
    statics: {
        title: '意见反馈',
        leftButton: { image: app.img.common_back2, handler: ()=>{app.scene.goBack()}},
    },
    toggleEdit() {
        this.doSubmit();
    },
    goBack() {
        dismissKeyboard();
        app.navigator.pop();
    },
    getInitialState() {
        return {
            content: '',
        }
    },
    doSubmit() {
        if (!this.state.content) {
            Toast('请填写您需要反馈的内容');
            return;
        }
        var param = {
            userID: app.personal.info.userID,
            content: this.state.content,
        };
        POST(app.route.ROUTE_SUBMIT_FEEDBACK, param, this.doSubmitSuccess);
    },
    doSubmitSuccess(data) {
        if (data.success) {
            Toast('提交成功');
            app.navigator.pop();
        } else {
            Toast(data.msg);
        }
    },
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.contentInput}
                            onChangeText={(text) => this.setState({content: text})}
                            defaultValue={this.state.content}
                            multiline={true}
                            textStyle={styles.contentText}
                            placeholderTextColor={'#A7A7A7'}
                            placeholder={'请填写反馈建议！\n您的意见就是我们成长的基石。'}
                            />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button onPress={this.doSubmit} style={[styles.btnSubmit, {backgroundColor:app.THEME_COLOR}]}>提    交</Button>
                    </View>
                </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0EFF5',
    },
    inputContainer: {
        height: 174,
        marginTop: 8,
        borderRadius: 2,
        marginHorizontal: 5,
        backgroundColor: '#FFFFFF',
    },
    contentInput: {
        flex: 1,
        fontSize: 16,
        marginVertical: 15,
        marginLeft: 10,
        lineHeight: 22,
        paddingVertical: 2,
        backgroundColor: '#FFFFFF',
        textAlignVertical: 'top',
    },
    contentText: {
        fontSize: 16,
        color: '#A7A7A7',
        lineHeight: 24,
        fontFamily: 'STHeitiSC-Medium',
    },
    buttonContainer: {
        justifyContent: 'center',
        marginLeft: 20,
        marginTop: 20,
    },
    btnSubmit: {
        width: sr.w-40,
        height: 40,
        borderRadius: 5,
    },
});
