'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    TextInput,
    Text,
} = ReactNative;

var {Button, Label} = COMPONENTS;

module.exports = React.createClass({
    statics: {
        title: '忘记密码',
    },
    getInitialState() {
        return {
            phone: this.props.phone||'',
            email: '',
        };
    },
    doSubmit() {
        const {phone, email} = this.state;
        if (!app.utils.checkPhone(phone)) {
            Toast('请填写正确的手机号码');
            return;
        }
        if (!app.utils.checkMailAddress(email)) {
            Toast('邮箱地址不规范，请重新输入');
            return;
        }
        var param = {
            phone,
            email,
        };
        POST(app.route.ROUTE_RETRIEVE_PASSWORD, param, this.doSubmitSuccess, true);
    },
    doSubmitSuccess(data) {
        if (data.success) {
            Toast('新的密码已经发送到您的邮箱，请注意查收');
            app.navigator.pop();
        } else {
            Toast(data.msg);
        }
    },
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.upContainer}>
                    <Text style={styles.info}>
                        {'       请正确填写注册该电话号码时的邮箱，我们会将新的密码发送到您的这个邮箱，请注意查收.'}
                    </Text>
                    <Label style={styles.label} img={app.img.login_user}>请输入电话号码</Label>
                    <View style={[styles.inputContainer]}>
                        <Text style={styles.text_phone_header}>+86</Text>
                        <TextInput
                            placeholder='手机号码'
                            onChangeText={(text) => this.setState({phone: text})}
                            defaultValue={this.props.phone}
                            style={styles.text_input}
                            keyboardType='phone-pad'
                            />
                    </View>
                    <Label style={styles.label} img={app.img.login_user}>请输入密码找回邮箱</Label>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='密码找回邮箱'
                            onChangeText={(text) => this.setState({email: text})}
                            style={styles.text_input2}
                            />
                    </View>
                </View>
                <Button onPress={this.doSubmit} style={styles.btnSubmit}>确   定</Button>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    info: {
        fontSize: 16,
        color: 'red',
        marginBottom: 30,
    },
    upContainer: {
        flex: 1,
        paddingTop: 40,
    },
    label: {
        marginTop: 20,
    },
    inputContainer: {
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D7D7D7',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        overflow: 'hidden',
        alignItems:'center',
    },
    text_phone_header: {
        color: '#A1A2A3',
        marginHorizontal: 10,
    },
    text_input: {
        paddingLeft: 10,
        height:40,
        width: 180,
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
    },
    text_input2: {
        paddingLeft: 10,
        height: 40,
        width: 320,
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
    },
    btnSubmit: {
        width: sr.w-20,
        height: 40,
        marginBottom: 40,
        borderRadius: 5,
    },
});
