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

var Help = require('./Help.js');
var About = require('./About.js');
var Update = require('./Update.js');
var Feedback = require('./Feedback');
var ModifyPassword = require('./ModifyPassword.js');
var CommonSetting = require('./CommonSetting.js');

var {Button, WebviewMessageBox} = COMPONENTS;

const CHILD_PAGES = [
    {title:'基础设置', module: CommonSetting, img:app.img.common_point, info:''},
    {strict:true, title:'修改密码', module: ModifyPassword, img:app.img.common_point, info:''},
    {seprator:true, title:'在线更新', module: Update, img:app.img.common_point, info:''},
    {title:'意见反馈', module: Feedback, img:app.img.common_point, info:''},
    {seprator:true, title:'软件许可协议', module: Help, img:app.img.common_point, info:''},
    {title:'关于我们', module: About, img:app.img.common_point, info:''},
];

var MenuItem = React.createClass({
    showChildPage() {
        const {module} = this.props.page;
        app.navigator.push({
            component: this.props.page.module,
        });
    },
    render() {
        const {title, img, info, seprator} = this.props.page;
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={this.showChildPage}
                style={seprator ? styles.ItemBg2 : styles.ItemBg}>
                <View style={styles.infoStyle}>
                    <Image
                        resizeMode='stretch'
                        source={img}
                        style={[styles.icon_item, {tintColor:app.THEME_COLOR}]}  />
                    <Text style={styles.itemNameText}>{title}</Text>
                    <Text style={styles.itemNoticeText}>{info}</Text>
                </View>
                <Image
                    resizeMode='stretch'
                    source={app.img.common_go}
                    style={styles.icon_go}  />
            </TouchableOpacity>
        )
    }
});

module.exports = React.createClass({
    statics: {
        title: '设置',
    },
    shouldComponentUpdate(nextProps, nextState) {
        return app.personal.info != null;
    },
    render() {
        var info = app.personal.info;
        return (
            <View style={styles.container}>
                <ScrollView>
                    {
                        CHILD_PAGES.map((item, i)=>{
                            if (!app.personal.info.phone && item.strict) {
                                return null;
                            }
                            return (
                                !item.hidden&&
                                <MenuItem page={item} key={i}/>
                            )
                        })
                    }
                </ScrollView>
            </View>
        );
    }
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
