'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} = ReactNative;

var EditPersonInfo = require('./EditPersonInfo.js');
var Settings = require('./Settings');
var Store = require('../test/store.js');

var {Button, DImage, WebviewMessageBox} = COMPONENTS;

const CHILD_PAGES = [
    {strict:true, title:'个人资料', module: EditPersonInfo, img:app.img.personal_info, info:''},
    {seprator:true, title:'设置', module: Settings, img:app.img.personal_settings, info:''},
    {hidden:!CONSTANTS.LOCAL_TEST, title:'查看存储', module: Store, img:app.img.personal_settings, info:''},
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
                        style={styles.icon_item}  />
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
        title: '个人中心',
    },
    doExit() {
        app.navigator.resetTo({
            title: '登录'+CONSTANTS.APP_NAME,
            component: require('../login/Login.js'),
        }, 0);
        app.personal.clear();
    },
    shouldComponentUpdate(nextProps, nextState) {
        return app.personal.info!=null;
    },
    render() {
        return (
            <View style={styles.container}>
                <Image
                    resizeMode='stretch'
                    style={styles.headImgBg}
                    source={app.img.home_background}>
                    <View>
                        <DImage
                            resizeMode='cover'
                            source={app.img.splash_logo}
                            style={styles.headStyle}
                            />
                    </View>
                    <Text style={styles.info}>
                        <Text style={[styles.bigInfo, {color: '#EE3B3B'}]}>人人</Text>监督    <Text style={[styles.bigInfo, {color: '#436EEE'}]}>监督</Text>人人
                    </Text>
                </Image>
                <ScrollView >
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
                <Button onPress={this.doExit} style={styles.btnExit}>{app.personal.info.phone?'安全退出':'没有身份的人生是不完整的'}</Button>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#ececec',
    },
    headImgBg:{
        height: 200,
        width: sr.w,
        alignItems:'center',
        justifyContent:'center',
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
    headStyle: {
        alignSelf: 'flex-start',
        width: 100,
        height: 100,
        borderRadius: 50,
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
    itemNumText: {
        marginLeft: 10,
        fontSize: 13,
        alignSelf: 'center',
        color: 'red',
    },
    itemNoticeText: {
        marginLeft: 65,
        fontSize: 12,
        color: 'gray',
        alignSelf: 'center',
    },
    info: {
        marginTop: 20,
        fontSize: 20,
        color: '#8B864E',
        backgroundColor: 'transparent',
    },
    bigInfo: {
        fontSize: 26,
    },
    btnExit: {
        position: 'absolute',
        width: sr.w-40,
        marginLeft: 20,
        height: 40,
        borderRadius: 5,
        backgroundColor:'#CD3700',
        bottom: 50,
    },
});
