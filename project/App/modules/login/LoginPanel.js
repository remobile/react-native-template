'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    Image,
    View,
    TextInput,
    ListView,
    Text,
    TouchableOpacity,
} = ReactNative;

var ForgetPassword = require('./ForgetPassword.js');
var Home = require('../home/index.js');

var {Button} = COMPONENTS;

var WeixinQQPanel = React.createClass({
    render() {
        return (
            <View style={styles.thirdpartyContainer}>
                <View style={styles.sepratorContainer}>
                    <View style={styles.sepratorLine}></View>
                    <Text style={styles.sepratorText} >{app.isandroid?'    ':''}或者您也可以</Text>
                </View>
                <View style={styles.thirdpartyButtonContainer}>
                    {
                        !!this.props.weixininstalled &&
                        <View style={styles.thirdpartyLeftButtonContainer}>
                            <Image
                                resizeMode='stretch'
                                source={app.img.login_weixin_button}
                                style={styles.image_button}
                                />
                            <Text style={styles.image_button_text}>微信登录</Text>
                        </View>
                    }
                    {
                        !!this.props.qqinstalled &&
                        <View style={styles.thirdpartyRightButtonContainer}>
                            <Image
                                resizeMode='stretch'
                                source={app.img.login_qq_button}
                                style={styles.image_button}
                                />
                            <Text style={styles.image_button_text}>QQ登录</Text>
                        </View>
                    }
                </View>
            </View>
        )
    }
});

var NoWeixinQQPanel = React.createClass({
    render() {
        return (
            <View style={styles.thirdpartyContainer2}>
                <Text style={[styles.thirdpartyContainer2_text, {color: app.THEME_COLOR}]}>人人监督         监督人人</Text>
            </View>
        )
    }
});

module.exports = React.createClass({
    doLogin() {;
        if (!app.utils.checkPhone(this.state.phone)) {
            Toast('手机号码不是有效的手机号码');
            return;
        }
        if (!app.utils.checkPassword(this.state.password)) {
            Toast('密码必须有6-20位的数字，字母，下划线组成');
            return;
        }
        var param = {
            phone:this.state.phone,
            password:this.state.password,
        };
        app.showProgressHud();
        POST(app.route.ROUTE_LOGIN, param, this.doLoginSuccess, this.doLoginError);
    },
    doLoginSuccess(data) {
        if (data.success) {
            app.login.savePhone(this.state.phone);
            this.doGetPersonalInfo();
        } else {
            Toast(data.msg);
            app.dismissProgressHud();
        }
    },
    doLoginError(error) {
        app.dismissProgressHud();
    },
    doAnonymousLogin() {
        app.personal.info = {phone: ''};
        app.navigator.replace({
            component: Home,
        });
    },
    doShowForgetPassword() {
        app.navigator.push({
            component: ForgetPassword,
            passProps: {
                phone: this.state.phone,
            },
        });
    },
    doGetPersonalInfo() {
        var param = {
            phone: this.state.phone,
        };
        POST(app.route.ROUTE_GET_PERSONAL_INFO, param, this.getPersonalInfoSuccess, this.getPersonalInfoError);
    },
    getPersonalInfoSuccess(data) {
        if (data.success) {
            var context = data.context;
            context['phone'] = this.state.phone;
            app.personal.set(context);
            app.navigator.replace({
                component: Home,
            });
        } else {
            app.dismissProgressHud();
            Toast(data.msg);
        }
    },
    getPersonalInfoError(error) {
        app.dismissProgressHud();
    },
    getInitialState() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            phone: this.props.phone|| app.login.list[0]||"",
            password: "",
            dataSource: ds.cloneWithRows(app.login.list),
            showList: false,
            weixininstalled: false,
            qqinstalled: false,
        };
    },
    onPhoneTextInputLayout(e) {
        var frame = e.nativeEvent.layout;
        this.listTop = frame.y+ frame.height;
    },
    renderRow(text) {
        return (
              <TouchableOpacity onPress={()=>this.setState({phone: text, showList:false})}>
                <Text style={styles.itemText}>
                  {text}
                </Text>
              </TouchableOpacity>
        )
    },
    renderSeparator(sectionID, rowID) {
        return (
            <View style={styles.separator} key={sectionID+rowID}/>
        );
    },
    onFocus() {
        this.setState({showList: this.state.dataSource.getRowCount()>0 && this.state.dataSource.getRowData(0, 0).length < 11});
    },
    onBlur() {
        this.setState({showList: false});
    },
    onPhoneTextChange(text) {
        var dataSource = this.state.dataSource;
        var newData = _.filter(app.login.list, (item)=>{var reg=new RegExp('^'+text+'.*'); return reg.test(item)});
        this.setState({
            phone: text,
            dataSource: dataSource.cloneWithRows(newData),
            showList: newData.length > 0 && text.length < 11,
        });
    },
    render() {
        var row = this.state.dataSource.getRowCount();
        var listHeight = row>4?styles.listHeightMax:row<2?styles.listHeightMin:null;
        return (
            <View style={{flex:1}}>
                <View
                    style={styles.inputContainer}
                    onLayout={this.onPhoneTextInputLayout}
                    >
                    <Image
                        resizeMode='stretch'
                        source={app.img.login_user}
                        style={styles.input_icon}
                        />
                    <TextInput
                        placeholder="您的手机号码"
                        onChangeText={this.onPhoneTextChange}
                        defaultValue={this.state.phone}
                        style={styles.text_input}
                        keyboardType='phone-pad'
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        />
                </View>
                <View style={styles.inputContainer}>
                    <Image
                        resizeMode='stretch'
                        source={app.img.login_locked}
                        style={styles.input_icon}
                        />
                    <TextInput
                        placeholder="您的密码"
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({password: text})}
                        defaultValue={this.state.password}
                        style={styles.text_input}
                        />
                </View>
                <View style={styles.btnForgetPassWordContainer}>
                    <Button onPress={this.doShowForgetPassword} style={styles.btnForgetPassWord} textStyle={styles.btnForgetPassWordText}>忘记密码?</Button>
                </View>
                <View style={styles.btnLoginContainer}>
                    <Button onPress={this.doLogin} style={styles.btnLogin} textStyle={styles.btnLoginText}>账号登录</Button>
                    <Button onPress={this.doAnonymousLogin} style={[styles.btnLogin, {backgroundColor:'#D1D1D1'}]} textStyle={styles.btnLoginText}>匿名登录</Button>
                </View>
                {this.state.qqinstalled || this.state.weixininstalled ? <WeixinQQPanel qqinstalled={this.state.qqinstalled} weixininstalled={this.state.weixininstalled}/>: <NoWeixinQQPanel />}
                {
                    this.state.showList &&
                    <ListView                        initialListSize={1}
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        keyboardShouldPersistTaps={true}
                        renderRow={this.renderRow}
                        renderSeparator={this.renderSeparator}
                        style={[styles.list, {top: this.listTop}, listHeight]}
                        />
                }
            </View>
        )
    }
});


var styles = StyleSheet.create({
    inputContainer: {
        height: 50,
        marginTop: 20,
        marginHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D7D7D7',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        overflow: 'hidden',
        alignItems:'center',
    },
    input_icon: {
        width: 28,
        height: 28,
    },
    text_input: {
        height:40,
        width: 250,
        fontSize:14,
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
    },
    btnForgetPassWordContainer: {
        height: 50,
        justifyContent:'center',
    },
    btnForgetPassWord: {
        marginRight: 20,
        borderRadius: 5,
        alignSelf: 'flex-end',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    btnForgetPassWordText: {
        fontSize: 14,
    },
    btnLoginContainer: {
        height: 60,
        justifyContent:'space-around',
        flexDirection: 'row',
    },
    btnLogin: {
        height: 40,
        width: 130,
        marginTop: 50,
    },
    btnLoginText: {
        fontSize: 20,
        fontWeight: '600',
    },
    thirdpartyContainer: {
        flex:1,
    },
    sepratorContainer: {
        height: 30,
        alignItems:'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    sepratorLine: {
        top: 10,
        height: 2,
        width: sr.w-20,
        backgroundColor: '#858687',
    },
    sepratorText: {
        backgroundColor:'#EEEEEE',
        color: '#A3A3A4',
        paddingHorizontal: 10,
    },
    thirdpartyButtonContainer: {
        marginTop: 30,
        height: 120,
        flexDirection: 'row',
    },
    thirdpartyLeftButtonContainer: {
        flex:1,
        alignItems:'center',
    },
    thirdpartyRightButtonContainer: {
        flex:1,
        alignItems:'center',
    },
    image_button: {
        width: 80,
        height: 80,
        margin: 10,
    },
    image_button_text: {
        color: '#4C4D4E',
        fontSize: 16,
    },
    thirdpartyContainer2: {
        marginTop: 30,
        height: 200,
        alignItems:'center',
        justifyContent: 'flex-end',
    },
    thirdpartyContainer2_text: {
        fontSize: 18,
        marginBottom:60,
    },
    list: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#D7D7D7',
        width: sr.w-48,
        left: 38,
        padding: 10,
    },
    listHeightMin: {
        height: 100,
    },
    listHeightMax: {
        height: 184,
    },
    itemText: {
        fontSize: 16,
        marginTop:20,
    },
    separator: {
      backgroundColor: '#DDDDDD',
      height: 1,
    },
});
