'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    Image,
    StyleSheet,
    View,
    TextInput,
} = ReactNative;

var {Button, Label} = COMPONENTS;

module.exports = React.createClass({
    statics: {
        title: '修改密码',
    },
    getInitialState() {
        return {
            oldPassword: '',
            newPassword1: '',
            newPassword2: '',
        };
    },
    goBack() {
        app.navigator.pop();
    },
    doSubmit() {
        const {oldPassword, newPassword1, newPassword2} = this.state;
        const {checkPassword} = app.utils;
        if (!checkPassword(oldPassword)|| !checkPassword(newPassword1)) {
            Toast('密码必须有6-20位的数字，字母，下划线组成');
            return;
        }
        if (!oldPassword) {
            Toast('请填写旧密码');
            return;
        }
        if (!newPassword1) {
            Toast('请填写新密码');
            return;
        }
        if (!newPassword2) {
            Toast('请再次填写新密码');
            return;
        }
        if (newPassword2 !== newPassword1) {
            Toast('两次填写新密码不一致');
            return;
        }
        var param = {
            phone: app.personal.info.phone,
            oldPassword,
            newPassword: newPassword1,
        };
        POST(app.route.ROUTE_MODIFY_PASSWORD, param, this.doSubmitSuccess);
    },
    doSubmitSuccess(data) {
        if (data.success) {
            Toast('修改成功');
            this.goBack();
        } else {
            Toast(data.msg);
        }
    },
    render() {
        return (
            <View style={styles.container}>
                <Label img={app.img.login_user}>请输入旧密码</Label>
                <TextInput
                    placeholder="请输入旧密码"
                    style={styles.txtIdea}
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({oldPassword: text})}
                    />
                <Label img={app.img.login_user}>请输入新密码</Label>
                <TextInput
                    placeholder="请输入新密码"
                    style={styles.txtIdea}
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({newPassword1: text})}
                    />
                <Label img={app.img.login_user}>请再次输入新密码</Label>
                <TextInput
                    placeholder="请再次输入新密码"
                    style={styles.txtIdea}
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({newPassword2: text})}
                    />
                <Button onPress={this.doSubmit} style={styles.btnSubmit}>提交</Button>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 25,
    },
    txtIdea: {
        height: 40,
        padding: 5,
        fontSize: 14,
        backgroundColor: 'white',
        textAlignVertical: 'top',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#DBDBDB'
    },
    btnSubmit: {
        position: 'absolute',
        width: sr.w-50,
        height: 40,
        bottom: 20,
        borderRadius: 20,
        backgroundColor:app.THEME_COLOR,
    },
});
