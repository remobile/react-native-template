'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
} = ReactNative;

var Update = require('@remobile/react-native-update');
var Help = require('./Help.js');
var About = require('./About.js');
var Feedback = require('./Feedback');
var ModifyPassword = require('./ModifyPassword.js');
var CommonSetting = require('./CommonSetting.js');
var UpdatePage = require('../update/UpdatePage.js');

var { Button, WebviewMessageBox } = COMPONENTS;

var MenuItem = React.createClass({
    showChildPage () {
        const { module, method } = this.props.page;
        if (method) {
            return method();
        }
        app.navigator.push({
            component: module,
        });
    },
    render () {
        const { title, img, info, seprator } = this.props.page;
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={this.showChildPage}
                style={seprator ? styles.ItemBg2 : styles.ItemBg}>
                <View style={styles.infoStyle}>
                    <Image
                        resizeMode='stretch'
                        source={img}
                        style={[styles.icon_item, { tintColor:app.THEME_COLOR }]} />
                    <Text style={styles.itemNameText}>{title}</Text>
                    <Text style={styles.itemNoticeText}>{info}</Text>
                </View>
                <Image
                    resizeMode='stretch'
                    source={app.img.common_go}
                    style={styles.icon_go} />
            </TouchableOpacity>
        );
    },
});

module.exports = React.createClass({
    statics: {
        title: '设置',
    },
    getInitialState () {
        return {
            options: null,
        };
    },
    componentWillMount () {
        Update.checkVersion({
            versionUrl: app.route.ROUTE_VERSION_INFO_URL,
            iosAppId: CONSTANTS.IOS_APPID,
        }).then((options) => {
            this.setState({ options });
        });
    },
    getChildPages () {
        const { options } = this.state;
        return [
            { title:'基础设置', module: CommonSetting, img:app.img.common_point, info:'' },
            { strict:true, title:'修改密码', module: ModifyPassword, img:app.img.common_point, info:'' },
            { seprator:false, title:'在线更新', method: () => {
                app.navigator.push({
                    title: '在线更新',
                    component: UpdatePage,
                    passProps: { options },
                });
            }, info: options === null ? '正在获取版本号...' : options === undefined ? '获取版本号失败' : options.newVersion ? ('有最新' + options.newVersion + '版本') : '' },
            { title:'意见反馈', module: Feedback, img:app.img.common_point, info:'' },
            { seprator:true, title:'软件许可协议', module: Help, img:app.img.common_point, info:'' },
            { title:'关于我们', module: About, img:app.img.common_point, info:'' },
        ];
    },
    render () {
        var info = app.personal.info || {};
        return (
            <View style={styles.container}>
                <ScrollView>
                    {
                        this.getChildPages().map((item, i) => {
                            if (!info.phone && item.strict) {
                                return null;
                            }
                            return (
                                !item.hidden &&
                                <MenuItem page={item} key={i} />
                            );
                        })
                    }
                </ScrollView>
            </View>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#ececec',
    },
    ItemBg2: {
        marginTop: 20,
        padding: 10,
        height: 45,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
    },
    ItemBg: {
        marginTop: 1,
        padding: 10,
        height: 45,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
    },
    icon_go: {
        alignSelf: 'flex-end',
        width: 8,
        height: 15,
    },
    infoStyle: {
        flex: 3,
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    icon_item: {
        width: 25,
        height: 25,
    },
    itemNameText: {
        fontSize: 17,
        color: 'gray',
        alignSelf: 'center',
        marginLeft: 10,
    },
    itemNoticeText: {
        marginLeft: 65,
        fontSize: 12,
        color: 'gray',
        alignSelf: 'center',
    },
});
