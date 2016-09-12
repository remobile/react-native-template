'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Animated,
    ScrollView,
} = ReactNative;

var About = require('./About.js');
var Feedback = require('./Feedback');
var Help = require('./Help.js');
var UpdateFrame = require('./UpdateFrame.js');
var MyNews = require('./MyNews.js');
var EditPersonInfo = require('./EditPersonInfo.js');

var {Button, DImage, WebviewMessageBox} = COMPONENTS;

var MENU = [
    {title:'关        于', webAddress:app.route.ROUTE_ABOUT_PAGE, module: About},
    {title:'意见反馈', module: Feedback},
    {title:'在线更新', module: UpdateFrame},
    {title:'软件许可协议', webAddress:app.route.ROUTE_SOFTWARE_LICENSE, module: Help},
    {title:'退出账号', handler: ()=>{
        app.navigator.resetTo({
            title: '登录赢销截拳道',
            component: require('../login/Login.js'),
        }, 0);
        app.personal.clear();
    }}
];

const CHILD_PAGES = [
    {seprator:true, title:'最新消息', module: MyNews, img:app.img.personal_news, info:''},
];


var MenuItem = React.createClass({
    showChildPage() {
        app.navigator.push({
            component: this.props.page.module,
        });
    },
    render() {
        var {title, img, info, seprator} = this.props.page;
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
        rightButton: { image: app.img.common_set, handler: ()=>{app.scene.toggleMenuPanel()}},
    },
    getInitialState() {
        return {
            overlayShow:false,
        };
    },
    toggleMenuPanel() {
        if (!this.state.overlayShow) {
            this.setState({overlayShow:true});
        } else {
            this.refs.overlayer.closeModal(()=>{
                this.setState({overlayShow:false});
            });
        }
    },
    onMenuItemClick(data) {
        this.setState({overlayShow:false});
        if (data.handler) {
            data.handler();
            return;
        }
        if (data.webAddress) {
            app.showModal(
                <WebviewMessageBox
                    webAddress={data.webAddress}/>,
                data.title
            );
            return;
        }
        app.showModal(
            <data.module />,
            data.title
        );
    },
    showEditPersonInfo() {
        app.navigator.push({
            component: EditPersonInfo,
        });
    },
    shouldComponentUpdate(nextProps, nextState) {
        return app.personal.info != null;
    },
    render() {
        var info = app.personal.info;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={this.showEditPersonInfo}
                    style={styles.headItemBg}>
                    <View>
                        {
                            <DImage
                                resizeMode='cover'
                                defaultSource={app.img.personal_default_head}
                                source={{uri: info.headImg}}
                                style={styles.headStyle}  />
                        }
                    </View>
                    <View style={styles.infoStyle2}>
                        <View style={styles.nameStyle}>
                            <Text style={styles.nameText}>
                                {info.name}
                            </Text>
                            {
                                info.isVip &&
                                <Image
                                    resizeMode='stretch'
                                    source={app.img.personal_vip}
                                    style={styles.icon_vip} />
                            }
                        </View>
                        <Text style={styles.infoText}>等级:{'    '}{info.level}{'     '}{info.alias}</Text>
                        <Text style={styles.infoText}>积分:{'    '}{info.integral}{!CONSTANTS.ISSUE_IOS?'    赢销币:    '+(info.winCoin||0):''}</Text>
                        <Text style={styles.infoText}>
                            {info.company}{'    '}{info.post}
                        </Text>
                    </View>
                    <View style={{justifyContent:'center'}}>
                        <Image
                            resizeMode='stretch'
                            source={app.img.common_go}
                            style={styles.icon_go}  />
                    </View>
                </TouchableOpacity>
                <ScrollView>
                    {
                        CHILD_PAGES.map((item, i)=>{
                            return (
                                !item.hidden&&<MenuItem page={item} key={i}/>
                            )
                        })
                    }
                </ScrollView>
                {
                    this.state.overlayShow &&
                    <OverlayPanel
                        toggleMenuPanel={this.toggleMenuPanel}
                        ref="overlayer"
                        onMenuItemClick={this.onMenuItemClick} />
                }
            </View>
        );
    }
});


var SetButton =  React.createClass({
    onPress() {
        this.props.onMenuItemClick(this.props.data);
    },
    render() {
        return (
            <TouchableHighlight
                style={styles.btnSet}
                underlayColor='#a0d468'
                onPress={this.onPress}
                >
                <Text style={styles.btnText}>
                    {this.props.data.title}
                </Text>
            </TouchableHighlight>
        );
    },
});


var OverlayPanel = React.createClass({
    getInitialState() {
        return {
            top: new Animated.Value(-500)
        };
    },
    componentDidMount() {
        Animated.timing(this.state.top, {
            toValue: 0,
            duration: 500,
        }
    ).start();
},
closeModal(callback) {
    Animated.timing(this.state.top, {
        toValue: -500,
        duration: 500,
    }).start(()=>{
        callback();
    });
},

render() {
    var hasUpdateMenu = app.isandroid || !CONSTANTS.ISSUE_IOS;
    return (
        <TouchableOpacity
            onPress={this.props.toggleMenuPanel}
            activeOpacity={1}
            style={[styles.overlayContainer, {top: this.state.top}]}>
            <Animated.View>
                <View style={styles.lineContainer} />
                <View style={[styles.panelContainer, hasUpdateMenu?styles.panelContainerHeight:styles.panelContainerHeight1]}>
                    {
                        MENU.map((item, i)=>{
                            if (item.title === "在线更新") {
                                if (!hasUpdateMenu) {
                                    return null;
                                }
                            }
                            return (
                                <SetButton
                                    key={i}
                                    style={styles.btnSet}
                                    textStyle={styles.btnText}
                                    data={item}
                                    onMenuItemClick={this.props.onMenuItemClick}
                                    >
                                </SetButton>
                            )
                        })
                    }
                </View>
            </Animated.View>
        </TouchableOpacity>
    )
}
});


var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#EEEEEE',
        flexDirection: 'column',
    },
    headItemBg: {
        marginTop: 15,
        padding: 15,
        height: 105,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
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
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    icon_vip: {
        width: 25,
        height: 20,
        marginTop: 3,
    },
    icon_go: {
        alignSelf: 'flex-end',
        width: 8,
        height: 15,
    },
    infoStyle2: {
        flex: 3,
        marginLeft: 10,
        flexDirection: 'column',
        alignSelf: 'center',
    },
    infoText: {
        fontSize: 12,
        color: 'gray',
        marginTop: 5,
    },
    nameStyle: {
        flexDirection: 'row',
    },
    nameText: {
        fontSize: 17,
        color: '#1988be',
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
    overlayContainer: {
        position:'absolute',
        top:0,
        left:0,
        width:sr.w,
        height:sr.h,
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    panelContainer: {
        marginHorizontal: 5,
        top: 0,
        alignSelf: 'flex-end',
        borderRadius: 4,
        width:sr.w/3,
        backgroundColor:'#1988be',
    },
    panelContainerHeight: {
        height:295,
    },
    panelContainerHeight1: {
        height:240,
    },
    btnSet: {
        marginTop: 15,
        width: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 4,
        backgroundColor:'white',
    },
    btnText: {
        fontSize: 13,
        alignSelf: 'center',
        color: 'grey',
    },
    lineContainer: {
        marginRight: 30,
        top: 0,
        alignSelf: 'flex-end',
        width:5,
        height:10,
        backgroundColor:'#1988be',
    },
});
