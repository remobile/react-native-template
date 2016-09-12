'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    TouchableOpacity,
} = ReactNative;
var ShowWebsite = require('./ShowWebsite.js');
var Accusations = require('./Accusations.js');
var PersonInfo = require('../person/PersonInfo.js');

const LIST_DATA = [
    {
        title:'王二大，清镇市保密局局长，贪污2000万，正在接受组织调查',
        date: '2016-02-12',
        source: {text: '清镇市纪委', url:'http://www.baidu.com'}
    },
    {
        title:'王二小，清镇市保密局副局长，贪污5000万，正在接受组织调查',
        date: '2016-02-12',
        source: {text: '清镇市纪委', url:'http://www.baidu.com'}
    },
];

const MENUS = [
    {
        text: '法律法规',
        img: app.img.home_menu1,
        url: 'http://www.baidu.com',
    },
    {
        text: '公示公开查询',
        img: app.img.home_menu2,
        url: 'http://www.baidu.com',
    },
    {
        text: '民生监督',
        img: app.img.home_menu3,
        url: 'http://www.baidu.com',
    },
    {
        text: '我要举报',
        img: app.img.home_menu4,
        module: Accusations,
    },
];

var MenuItem = React.createClass({
    onPress(menu) {
        if (menu.url) {
            app.navigator.push({
                title: menu.text,
                component: ShowWebsite,
                passProps: {
                    url: menu.url,
                },
            });
        } else {
            app.navigator.push({
                title: menu.text,
                component: Accusations,
            });
        }
    },
    render() {
        const menu = MENUS[this.props.index];
        return (
            <TouchableOpacity style={styles.menuItem} onPress={this.onPress.bind(null, menu)}>
                <Image
                    resizeMode='stretch'
                    source={menu.img}
                    style={styles.menuImage}>
                </Image>
                <Text style={styles.menuText}>
                    {menu.text}
                </Text>
            </TouchableOpacity>
        )
    }
});

module.exports = React.createClass({
    getInitialState() {
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: this.ds.cloneWithRows(LIST_DATA),
        };
    },
    componentWillMount() {
        app.toggleNavigationBar(false);
    },
    onWillFocus() {
        app.toggleNavigationBar(false);
    },
    showSourceWeb(obj) {
        app.navigator.push({
            title: obj.title,
            component: ShowWebsite,
            passProps: {
                url: obj.source.url,
            },
        });
    },
    showLeftMenu() {
        app.navigator.push({
            component: PersonInfo,
            fromLeft: true,
        });
    },
    renderRow(obj, sectionID, rowID) {
        const {title, date, source} = obj;
        return (
            <TouchableOpacity key={rowID} style={styles.row} onPress={this.showSourceWeb.bind(null, obj)}>
                <View style={styles.rowHead}>
                    <Image
                        resizeMode='stretch'
                        source={app.img.common_point}
                        style={styles.rowHeadImage}>
                    </Image>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.rowUp}>
                        <Text style={styles.rowTitle}>{title}</Text>
                    </View>
                    <View style={styles.rowDown}>
                        <Text style={styles.rowDate}>{date}</Text>
                        <Text style={styles.rowSource}>{`来源:${source.text}`}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    },
    renderSeparator(sectionID, rowID) {
        return (
            <View style={styles.separator} key={rowID}/>
        );
    },
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Image
                        resizeMode='stretch'
                        style={styles.topImage}
                        source={app.img.home_background}>
                        <View>
                            <Image
                                resizeMode='cover'
                                source={app.img.splash_logo}
                                style={styles.headStyle}
                                />
                        </View>
                        <Text style={styles.info}>
                            <Text style={[styles.bigInfo, {color: '#EE3B3B'}]}>人人</Text>监督    <Text style={[styles.bigInfo, {color: '#436EEE'}]}>监督</Text>人人
                        </Text>
                    </Image>
                </View>
                <View style={styles.middleContainer}>
                    <View style={styles.middleRow}>
                        <MenuItem index={0} />
                        <View style={styles.vline}/>
                        <MenuItem index={1} />
                    </View>
                    <View style={styles.hline}/>
                    <View style={styles.middleRow}>
                        <MenuItem index={2} />
                        <View style={styles.vline}/>
                        <MenuItem index={3} />
                    </View>
                </View>
                <View style={styles.hline}/>
                <View style={styles.bottomTitle}>
                    <Image
                        resizeMode='stretch'
                        source={app.img.login_user}
                        style={styles.bottomTitleImage}>
                    </Image>
                    <Text style={styles.bottomTitleText}>纪律检查</Text>
                </View>
                <View style={styles.bottomContainer}>
                    <ListView
                        initialListSize={1}
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        keyboardShouldPersistTaps={true}
                        renderRow={this.renderRow}
                        renderSeparator={this.renderSeparator}
                        />
                </View>
                <TouchableOpacity style={styles.leftMenuContainer} onPress={this.showLeftMenu}>
                    <Image
                        resizeMode='stretch'
                        source={app.img.common_left_menu}
                        style={styles.leftMenuImage}>
                    </Image>
                </TouchableOpacity>
            </View>
        );
    },
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    leftMenuContainer: {
        position: 'absolute',
        top: 20,
        left: 10,
        width: 50,
        height: 50,
    },
    leftMenuImage: {
        width: 50,
        height: 30,
    },
    topContainer: {
        height: sr.mw,
    },
    topImage: {
        height: sr.mw,
        width: sr.w,
        alignItems:'center',
        justifyContent:'center',
    },
    middleContainer: {
        height: sr.mw,
    },
    middleRow: {
        flex: 1,
        flexDirection: 'row',
    },
    menuItem: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuImage: {
        width: 50,
        height: 50,
        tintColor: CONSTANTS.THEME_COLOR,
    },
    menuText: {
        marginTop: 6,
        fontSize: 16,
        color: '#787878',
    },
    vline: {
        width: 1,
        backgroundColor: '#7A7A7A',
    },
    hline: {
        height: 1,
        backgroundColor: '#7A7A7A',
    },
    bottomTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    bottomTitleImage: {
        width: 40,
        height: 40,
        marginRight: 20,
        tintColor: CONSTANTS.THEME_COLOR,
    },
    bottomTitleText: {
        fontSize: 18,
        color:  CONSTANTS.THEME_COLOR,
        fontWeight: '600',
    },
    bottomContainer: {
        flex: 1,
        paddingTop: 2,
    },
    row: {
        flexDirection: 'row',
        height: 80,
    },
    rowHead: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowHeadImage: {
        width: 30,
        height: 30,
        tintColor: CONSTANTS.THEME_COLOR,
    },
    rowContainer: {
        flex: 1,
    },
    rowUp: {
        flex: 1,
        justifyContent: 'center',
    },
    rowTitle: {
        fontSize: 14,
        color: '#8B2323',
    },
    rowDown: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowDate: {
        fontSize: 14,
        color: '#7A7A7A',
        marginRight: 20,
    },
    rowSource: {
        fontSize: 14,
        color: '#BC8F8F',
    },
    separator: {
      backgroundColor: '#DDDDDD',
      height: 1,
    },
    headStyle: {
        alignSelf: 'flex-start',
        width: 100,
        height: 100,
        borderRadius: 50,
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
});
