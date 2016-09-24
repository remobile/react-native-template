'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    TextInput,
} = ReactNative;

var {Button, Label} = COMPONENTS;

module.exports = React.createClass({
    statics: {
        title: '意见反馈',
    },
    doSubmit() {
        if (!this.state.content) {
            Toast('请填写您需要反馈的内容');
            return;
        }
        var param = {
            phone: app.personal.info.phone,
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
    getInitialState() {
        return {
            content: '',
        };
    },
    render() {
        return (
            <View style={styles.container}>
                <Label img={app.img.login_user}>请输入要反馈给我们的意见</Label>
                <TextInput
                    style={styles.contentInput}
                    onChangeText={(text) => this.setState({content: text})}
                    value={this.state.content}
                    multiline={true}
                    placeholder={'请输入要反馈给我们的意见'}
                    />
                <View style={styles.buttonContainer}>
                    <Button onPress={this.doSubmit} style={[styles.btnSubmit, {backgroundColor:app.THEME_COLOR}]}>提    交</Button>
                </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    contentInput: {
        flex: 8,
        fontSize: 16,
        padding:10,
        borderRadius: 5,
        backgroundColor:'#FFFFFF',
    },
    buttonContainer: {
        flex: 2,
        justifyContent: 'center',
    },
    btnSubmit: {
        width: sr.w-40,
        height: 40,
        borderRadius: 5,
    },
});
