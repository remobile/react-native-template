'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    TextInput,
} = ReactNative;

var {Button} = COMPONENTS;

module.exports = React.createClass({
    statics: {
        title: '忘记密码',
    },
    doSubmit() {
        if (!app.utils.checkPassword(this.state.pwd)) {
            Toast('密码必须有6-20位的数字，字母，下划线组成');
            return;
        }
        if (this.state.pwd !== this.state.pwdAgain) {
            Toast('两次输入密码不一致，请确认后重新输入');
            return;
        }
        var param = {
            phone: this.props.phone,
            pwd:this.state.pwd,
            pwdAgain:this.state.pwdAgain
        };
        POST(app.route.ROUTE_UP_DATEPWD, param, this.doSubmitSuccess);
        app.navigator.popToTop();
    },
    doSubmitSuccess(data) {
        if (data.success) {
            Toast(data.msg);
            app.navigator.popToTop();
        } else {
            Toast(data.msg);
        }
    },
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.outsideContainer}>
                      <TextInput
                          placeholder="输入新密码"
                          style={styles.txtPassWord}
                          secureTextEntry={true}
                          onChangeText={(text) => this.setState({pwd: text})}
                          />
                      <TextInput
                          placeholder="再次输入新密码"
                          style={styles.txtPassWord}
                          secureTextEntry={true}
                          onChangeText={(text) => this.setState({pwdAgain: text})}
                          />
                      <Button onPress={this.doSubmit} style={styles.btnSubmit}>确定</Button>
                </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    outsideContainer: {
        flex: 1,
        marginTop: 80,
    },
    txtPassWord: {
        height: 50,
        marginTop: 30,
        marginHorizontal: 10,
        paddingLeft: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D7D7D7',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        overflow: 'hidden',
        alignItems:'center',
    },
    btnSubmit: {
        height: 50,
        marginTop: 70,
        marginHorizontal: 10,
        borderRadius: 10,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#4FC1E9',
    },
});
