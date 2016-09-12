'use strict';

console.disableYellowBox = true;

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    Navigator,
    Platform,
    BackAndroid,
    NetInfo,
    View,
    PixelRatio,
    Text,
    Image,
    TouchableOpacity,
    StatusBar,
    NativeModules,
    Dimensions,
} = ReactNative;

global._ = require('lodash');
global.sr = require('./config/Screen.js');
global.Toast = require('@remobile/react-native-toast').show;
global.CONSTANTS = require('./config/Constants.js');
global.POST = require('./utils/net/Post.js');
global.GET = require('./utils/net/Get.js');
global.UPLOAD = require('./utils/net/Upload.js');
global.MULTIUPLOAD = require('./utils/net/MultiUpload.js');
global.COMPONENTS = require('./components/index.js');
global.DelayTouchableOpacity = COMPONENTS.DelayTouchableOpacity;

var ProgressHUD = require('react-native-progress-hud');
var TimerMixin = require('react-timer-mixin');
var Utils = require('./utils/common/index.js');
var Route = require('./config/Route.js');
var img = require('./resource/image.js');
var aud = require('./resource/audio.js');
var PersonalInfoMgr = require('./manager/PersonalInfoMgr.js');
var LoginMgr = require('./manager/LoginMgr.js');

global.app = {
    route: Route,
    utils: Utils,
    img: img,
    aud: aud,
    data: {},
    personal: PersonalInfoMgr,
    login: LoginMgr,
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

var Splash = require('./modules/splash/index.js');

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
                style={styles.navBarLeftButton}>
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
                    style={styles.navBarRightButton}>
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
                    style={styles.navBarRightButton}>
                    <Text style={[styles.navBarText, styles.navBarButtonText]}>
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
                <View style={[styles.titleContainer, {height: sr.navBarHeight}]}>
                    <Text
                        numberOfLines={1}
                        style={[styles.navBarText, styles.navBarTitleText, {textAlign: 'center'}]}>
                        {title}
                    </Text>
                </View>
            );
        } else {
          return (
            <View style={[styles.titleContainer, {height: sr.navBarHeight}]}>
                {title}
            </View>
          )
        }
    },
};

module.exports = React.createClass({
    mixins: [ProgressHUD.Mixin, TimerMixin],
    getInitialState() {
        return {
            showNavBar: false,
            modalShow: false,
            modalContent: null,
            modalTitle: '',
            modalBackgroundColor: null,
        };
    },
    componentWillMount() {
        app.root = this;
        app.showProgressHUD = this.showProgressHUD;
        app.dismissProgressHUD = this.dismissProgressHUD;
        app.showModal = (view, title, backgroundColor) => {
            this.setState({
                modalShow: true,
                modalContent: view,
                modalTitle: title,
                modalBackgroundColor: backgroundColor,
            });
        };
        app.hideModal = () => {
            this.refs.modal.closeModal();
        };
        app.closeModal = () => {
            this.setState({
                modalShow: false,
            });
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
    componentDidMount: function() {
        NetInfo.isConnected.addEventListener(
            'change',
            this._handleConnectivityChange
        );
        NetInfo.isConnected.fetch().done(
            (connect) => {app.connect = connect;}
        );
    },
    componentWillUnmount: function() {
        NetInfo.isConnected.removeEventListener(
            'change',
            this._handleConnectivityChange
        );
    },
    _handleConnectivityChange: function(connect) {
        app.connect = connect;
        if (!connect) {
            Toast('当前设备已离线，请检查您的网络是否可用');
        }
    },
    configureScene(route){
        return app.configureScene(route);
    },
    renderScene(route, navigator) {
        return (
            <View style={{flex: 1}}>
                {this.state.showNavBar&&<View style={{height:sr.totalNavHeight}} />}
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
                style={styles.navBar}
                />
        );
        return (
            <View style={{flex:1}}>
                <Navigator
                    ref={(navigator) => {
                        app.navigator = navigator;
                    }}
                    debugOverlay={false}
                    style={styles.container}
                    initialRoute={initialRoute}
                    configureScene={this.configureScene}
                    renderScene={this.renderScene}
                    onDidFocus={(route)=>{
                        var ref = route.ref;
                        var getChildScene = ref && ref.getChildScene;
                        var scene = app.scene = getChildScene ? getChildScene() : ref;
                        scene && scene.onDidFocus && scene.onDidFocus();
                    }}
                    onWillFocus={(route)=>{
                        var ref = route.ref;
                        var getChildScene = ref && ref.getChildScene;
                        var scene = getChildScene ? getChildScene() : ref;
                        scene && scene.onWillFocus && scene.onWillFocus();//注意：在首次加载的时候是不会调用的，只有从上页面返回的时候才能被调用
                    }}
                    navigationBar={this.state.showNavBar ? navigationBar : null}
                    />
                {
                    this.state.modalShow &&
                    <COMPONENTS.Modal ref="modal" title={this.state.modalTitle} backgroundColor={this.state.modalBackgroundColor}>
                        {this.state.modalContent}
                    </COMPONENTS.Modal>
                }
                <ProgressHUD
                    isVisible={this.state.is_hud_visible}
                    isDismissible={false}
                    overlayColor="rgba(0, 0, 0, 0.6)"
                    color="#239FDB"
                    />
            </View>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#EEEEEE'
    },
    navBar: {
        backgroundColor: '#239FDB',
        alignItems:'center',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    titleContainer: {
        width: sr.w,
        backgroundColor: '#239FDB',
        alignItems:'center',
    },
    navBarText: {
        fontSize: 18,
        marginVertical: 10,
    },
    navBarTitleText: {
        color: '#FFFFFF',
        fontWeight: '500',
        marginVertical: 9,
        width: sr.mw,
    },
    navBarLeftButton: {
        flexDirection: 'row',
        paddingLeft: 8,
        alignItems:'center',
    },
    navBarRightButton: {
        flexDirection: 'row',
        paddingRight: 8,
        alignItems:'center'
    },
    navBarRightEmptyButton: {
        width: 70,
        height: 50,
        backgroundColor: '#239FDB',
    },
    navBarButtonText: {
        color: '#FFFFFF',
    },
    navBarIcon: {
        marginTop: 3,
        width: 47,
        height:32,
    },
});
