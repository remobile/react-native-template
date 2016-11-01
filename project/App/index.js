'use strict';

console.disableYellowBox = true;

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    Navigator,
    Platform,
    BackAndroid,
    View,
    Text,
    Image,
    NativeModules,
} = ReactNative;


global._ = require('lodash');
global.sr = require('./config/Screen.js');
global.Toast = require('@remobile/react-native-toast').show;
global.CONSTANTS = require('./config/Constants.js');
const {POST, GET, UPLOAD, MULTIUPLOAD} = require('./utils/net');
global.POST = POST;
global.GET = GET;
global.UPLOAD = UPLOAD;
global.MULTIUPLOAD = MULTIUPLOAD;
global.COMPONENTS = require('./components/index.js');
global.DelayTouchableOpacity = COMPONENTS.DelayTouchableOpacity;

var ProgressHud = COMPONENTS.ProgressHud;
var TimerMixin = require('react-timer-mixin');
var Utils = require('./utils/common/index.js');
var Route = require('./config/Route.js');
var img = require('./resource/image.js');
var aud = require('./resource/audio.js');
var PersonalInfoMgr = require('./manager/PersonalInfoMgr.js');
var NetMgr = require('./manager/NetMgr.js');
var SettingMgr = require('./manager/SettingMgr.js');
var LoginMgr = require('./manager/LoginMgr.js');
var MediaFileMgr = require('./manager/MediaFileMgr.js');

global.app = {
    route: Route,
    utils: Utils,
    img: img,
    aud: aud,
    data: {},
    personal: PersonalInfoMgr,
    net: NetMgr,
    setting: SettingMgr,
    login: LoginMgr,
    mediaFileMgr: MediaFileMgr,
    isandroid: Platform.OS==="android",
};

app.configureScene = function(route) {
    route = route||{};
    var sceneConfig = route.sceneConfig;
    if (sceneConfig) {
        return sceneConfig;
    }
    if (Platform.OS==="android") {
        if (route.fromLeft) {
            sceneConfig = {...Navigator.SceneConfigs.FloatFromLeft, gestures: null};
        } else {
            sceneConfig = Navigator.SceneConfigs.FadeAndroid;
        }
    } else {
        if (route.fromLeft) {
            sceneConfig = {...Navigator.SceneConfigs.FloatFromLeft, gestures: null};
        } else {
            sceneConfig = {...Navigator.SceneConfigs.HorizontalSwipeJump, gestures: null};
        }
    }
    return sceneConfig;
};

var Splash = require('./modules/test/emoji.js');

var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        var leftButton = route.leftButton||route.component.leftButton;
        if (index===0 && !leftButton) {
            return null;
        }
        var image = leftButton&&leftButton.image||app.img.common_back;
        var handler = leftButton&&leftButton.handler||navigator.pop;
        return (
            <DelayTouchableOpacity
                onPress={handler}
                style={styles.navBarButton}>
                <Image
                    resizeMode='stretch'
                    source={image}
                    style={styles.navBarIcon} />
            </DelayTouchableOpacity>
        );
    },
    RightButton(route, navigator, index, navState) {
        var rightButton = route.rightButton||route.component.rightButton;
        if (!rightButton) {
            return <View style={styles.navBarRightEmptyButton}/>;
        }
        if (rightButton.image) {
            return (
                <DelayTouchableOpacity
                    onPress={rightButton.handler}
                    style={styles.navBarButton}>
                    <Image
                        resizeMode='stretch'
                        source={rightButton.image}
                        style={styles.navBarIcon} />
                </DelayTouchableOpacity>
            );
        } else {
            return (
                <DelayTouchableOpacity
                    onPress={rightButton.handler}
                    style={styles.navBarButton}>
                    <Text style={styles.navBarButtonText}>
                        {rightButton.title}
                    </Text>
                </DelayTouchableOpacity>
            );
        }
    },
    Title(route, navigator, index, navState) {
        var title = route.title||route.component.title;
        if (typeof title === 'string') {
            return (
                <View style={styles.titleContainer}>
                    <Text
                        numberOfLines={1}
                        style={styles.navBarTitleText}>
                        {title}
                    </Text>
                </View>
            );
        } else {
          return (
            <View style={styles.titleContainer}>
                {title}
            </View>
          )
        }
    },
};

module.exports = React.createClass({
    mixins: [ProgressHud.Mixin, TimerMixin],
    getInitialState() {
        return {
            showNavBar: false,
            modalShow: false,
            modalContent: null,
            modalTitle: '',
            modalBackgroundColor: null,
            modalTouchHide: false,
        };
    },
    componentWillMount() {
        if (!app.isandroid) {
            NativeModules.AccessibilityManager.setAccessibilityContentSizeMultipliers({
                "extraSmall": 1,
                "small": 1,
                "medium": 1,
                "large": 1,
                "extraLarge": 1,
                "extraExtraLarge": 1,
                "extraExtraExtraLarge": 1,
                "accessibilityMedium": 1,
                "accessibilityLarge": 1,
                "accessibilityExtraLarge": 1,
                "accessibilityExtraExtraLarge": 1,
                "accessibilityExtraExtraExtraLarge": 1
            });
        }
        app.mediaFileMgr.checkRootDir();
        app.root = this;
        app.showProgressHud = this.showProgressHud;
        app.dismissProgressHud = this.dismissProgressHud;
        app.showModal = (view, options={}) => {
            const { title, backgroundColor, touchHide} = options;
            this.setState({
                modalShow: true,
                modalContent: view,
                modalTitle: title,
                modalBackgroundColor: backgroundColor,
                modalTouchHide: touchHide,
            });
        };
        app.closeModal = () => {
            this.refs.modal.closeModal();
        };
        app.removeModal = () => {
            this.setState({
                modalShow: false,
            });
        };
        app.update = () => {
            this.setState({});
        };
        app.forceUpdateNavbar = () => {
            this.setState({
                showNavBar: true,
            });
        };
        app.toggleNavigationBar = (show) => {
            this.setImmediate(()=>{
                this.setState({showNavBar:show});
            });
        };
        app.getCurrentRoute = ()=>{
            var {routeStack, presentedIndex} = app.navigator.state;
            return routeStack[presentedIndex];
        };
        app.pop = (step=1)=>{
            if (step ===1 ) {
                app.navigator.pop();
            } else {
                var routes = app.navigator.getCurrentRoutes();
                var index = routes.length-step-1;
                if (index > 0) {
                    app.navigator.popToRoute(routes[index]);
                } else {
                    app.navigator.popToTop();
                }
            }
        };
        if (app.isandroid) {
            BackAndroid.addEventListener('hardwareBackPress', ()=>{
                if (this.state.is_hud_visible) {
                    this.setState({is_hud_visible: false});
                    return true;
                }
                if (this.state.modalShow) {
                    this.setState({modalShow: false});
                    return true;
                }
                var routes = app.navigator.getCurrentRoutes();
                if (routes.length > 1) {
                    var leftButton = routes[routes.length-1].component.leftButton;
                    if (leftButton && leftButton.handler) {
                        leftButton.handler();
                    } else {
                        app.navigator.pop();
                    }
                    return true;
                }
                if (!app.willExitAndroid) {
                    Toast("再按一次返回键退出程序");
                    app.willExitAndroid = true;
                    this.setTimeout(()=>{app.willExitAndroid = false}, 3000);
                    return true;
                }
                return false;
            });
        }
    },
    componentWillUnmount: function() {
        app.net.unregister();
    },
    configureScene(route){
        return app.configureScene(route);
    },
    renderScene(route, navigator) {
        return (
            <View style={{flex: 1}}>
                {this.state.showNavBar&&<View style={[styles.navBarBack, {backgroundColor:app.THEME_COLOR}]} />}
                <route.component
                    {...route.passProps}
                    ref={(ref)=>{if(ref)route.ref=ref}}/>
            </View>
        );
    },
    render() {
        var initialRoute = {
            component: Splash,
        };
        var navigationBar = (
            <Navigator.NavigationBar
                routeMapper={NavigationBarRouteMapper}
                style={[styles.navBar, {backgroundColor: app.THEME_COLOR}]}
                />
        );
        return (
            <View style={{flex:1}}>
                <Navigator
                    ref={(navigator) => {
                        if (navigator) {
                            app.navigator = navigator;
                        }
                    }}
                    debugOverlay={false}
                    style={styles.container}
                    initialRoute={initialRoute}
                    configureScene={this.configureScene}
                    renderScene={this.renderScene}
                    onDidFocus={(route)=>{
                        var ref = route.ref;
                        var getChildScene = ref && ref.getChildScene;
                        //注意：app.scene调用的时候一定需要使用封装函数，如：{handler: ()=>{app.scene.toggleEdit()}}，不能直接使用 handler: app.scene.toggleEdit.
                        var scene = app.scene = getChildScene ? getChildScene() : ref;
                        if (getChildScene && !scene.hasMouted) {
                            scene.hasMouted = true;
                            return;
                        }
                        scene && scene.onDidFocus && scene.onDidFocus();
                    }}
                    onWillFocus={(route)=>{
                        var preRoute = app.navigator && app.getCurrentRoute();
                        if (preRoute) {
                            var preRef = preRoute.ref;
                            var preGetChildScene = preRef && preRef.getChildScene;
                            var preScene = preGetChildScene ? preGetChildScene() : preRef;
                            preScene && preScene.onWillHide && preScene.onWillHide();
                        }
                        var ref = route.ref;
                        var getChildScene = ref && ref.getChildScene;
                        var scene = getChildScene ? getChildScene() : ref;
                        scene && scene.onWillFocus && scene.onWillFocus();//注意：在首次加载的时候页面没有被加载，route.ref为空，不会调用该函数，需要在该页面的componentWillMount里面处理首次逻辑，只有从上页面返回的时候才能被调用
                    }}
                    navigationBar={this.state.showNavBar ? navigationBar : null}
                    />
                {
                    this.state.modalShow &&
                    <COMPONENTS.Modal ref="modal" title={this.state.modalTitle} backgroundColor={this.state.modalBackgroundColor} modalTouchHide={this.state.modalTouchHide}>
                        {this.state.modalContent}
                    </COMPONENTS.Modal>
                }
                <ProgressHud
                    isVisible={this.state.is_hud_visible}
                    isDismissible={false}
                    overlayColor="rgba(0, 0, 0, 0.6)"
                    color={app.THEME_COLOR}
                    />
            </View>
        );
    },
});

var NAVBAR_HEIGHT = sr.rws(Navigator.NavigationBar.Styles.General.NavBarHeight);
var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#EEEEEE'
    },
    navBarBack: {
        height:sr.totalNavHeight,
    },
    navBar: {
        alignItems:'center',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    titleContainer: {
        width: sr.w,
        height: NAVBAR_HEIGHT,
        alignItems:'center',
        justifyContent: 'center',
    },
    navBarButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    navBarTitleText: {
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '500',
        width: sr.w/2,
    },
    navBarButton: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        height:NAVBAR_HEIGHT,
        alignItems: 'center',
    },
    navBarRightEmptyButton: {
        width: 80,
        height: NAVBAR_HEIGHT,
        backgroundColor: CONSTANTS.THEME_COLOR,
    },
    navBarIcon: {
        width: NAVBAR_HEIGHT*0.6,
        height: NAVBAR_HEIGHT*0.6,
    },
});
