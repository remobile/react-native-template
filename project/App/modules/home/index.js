'use strict';
var React = require('react');var ReactNative = require('react-native');
var {
    Navigator,
    PixelRatio,
    StyleSheet,
    ScrollView,
    Text,
    View,
    Image
} = ReactNative;

import TabNavigator from 'react-native-tab-navigator';
var Test = require('../test');
var Remobile = require('../remobile');
var Empty = require('./Empty.js');

var INIT_ROUTE_INDEX = 0;
var ROUTE_STACK = [
    {index: 0, component:  Test},
    {index: 1, component: Remobile},
    {index: 2, component: Empty},
    {index: 3, component: Empty},
];
if (CONSTANTS.ISSUE_IOS) {
    _.remove(ROUTE_STACK, (o)=>o.index===3);
}

var HomeTabBar = React.createClass({
    componentWillMount() {
        app.showMainScene = (i)=> {
            var {title, leftButton, rightButton} = _.find(ROUTE_STACK, (o)=>o.index===i).component;
            Object.assign(app.getCurrentRoute().component, {
                title: title,
                leftButton: leftButton,
                rightButton: rightButton,
            });
            this.props.onTabIndex(i);
            app.forceUpdateNavbar();
        }
    },
    componentDidMount() {
        app.toggleNavigationBar(true);
    },
    getInitialState() {
        return {
            tabIndex: this.props.initTabIndex,
        };
    },
    handleWillFocus(route) {
        var tabIndex = route.index;
        this.setState({ tabIndex, });
    },
    render() {
        var menus = [
            {index: 0, title: '场景1', icon: app.img.home_menu1, selected: app.img.home_menu1},
            {index: 1, title: '场景2', icon: app.img.home_menu2, selected: app.img.home_menu2},
            {index: 2, title: '场景3', icon: app.img.home_menu3, selected: app.img.home_menu3},
            {index: 3, title: '场景4', icon: app.img.home_menu4, selected: app.img.home_menu4},
        ];
        if (CONSTANTS.ISSUE_IOS) {
            _.remove(menus, (o)=>o.index===3);
        }
        var TabNavigatorItems = menus.map((item)=>{
            return (
                <TabNavigator.Item
                    key={item.index}
                    selected={this.state.tabIndex === item.index}
                    title={item.title}
                    titleStyle={styles.titleStyle}
                    renderIcon={() =>
                        <Image
                            resizeMode='stretch'
                            source={item.icon}
                            style={styles.icon} />
                    }
                    renderSelectedIcon={() =>
                        <Image
                            resizeMode='stretch'
                            source={item.selected}
                            style={styles.icon} />
                    }
                    onPress={() => {
                        app.showMainScene(item.index);
                    }}>
                    <View />
                </TabNavigator.Item>
            )
        });
        return (
            <View style={styles.tabs}>
                <TabNavigator
                    tabBarStyle={styles.tabBarStyle}
                    tabBarShadowStyle={styles.tabBarShadowStyle}
                    hidesTabTouch={true} >
                    {TabNavigatorItems}
                </TabNavigator>
            </View>
        );
    },
});

module.exports = React.createClass({
    statics: {
        title: ROUTE_STACK[INIT_ROUTE_INDEX].component.title,
        leftButton: ROUTE_STACK[INIT_ROUTE_INDEX].component.leftButton,
        rightButton: ROUTE_STACK[INIT_ROUTE_INDEX].component.rightButton,
    },
    getChildScene() {
        return this.scene;
    },
    renderScene(route, navigator) {
        return <route.component ref={(ref)=>{if(ref)route.ref=ref}}/>;
    },
    render() {
        return (
            <Navigator
                debugOverlay={false}
                style={styles.container}
                ref={(navigator) => {
                    this._navigator = navigator;
                }}
                initialRoute={ROUTE_STACK[INIT_ROUTE_INDEX]}
                initialRouteStack={ROUTE_STACK}
                renderScene={this.renderScene}
                onDidFocus={(route)=>{
                    var ref = this.scene = app.scene = route.ref;
                    ref && ref.onDidFocus && ref.onDidFocus();
                }}
                onWillFocus={(route)=>{
                    if (this._navigator) {
                        var {routeStack, presentedIndex} = this._navigator.state;
                        var preRoute = routeStack[presentedIndex];
                        if (preRoute) {
                            var preRef = preRoute.ref;
                            preRef && preRef.onWillHide && preRef.onWillHide();
                        }
                    }
                    var ref = route.ref;
                    ref && ref.onWillFocus && ref.onWillFocus(); //注意：因为有initialRouteStack，在mounted的时候所有的页面都会加载，因此只有第一个页面首次不会调用，需要在componentDidMount中调用，其他页面可以调用
                }}
                configureScene={(route) => ({
                    ...app.configureScene(route),
                })}
                navigationBar={
                    <HomeTabBar
                        initTabIndex={INIT_ROUTE_INDEX}
                        onTabIndex={(index) => {
                            this._navigator.jumpTo(_.find(ROUTE_STACK, (o)=>o.index===index));
                        }}
                        />
                }
                />
        );
    },
});


var styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        flex: 1,
    },
    tabs: {
        height: 60,
        width: sr.w,
        position: 'absolute',
        left: 0,
        top: sr.rws(sr.th-sr.totalNavHeight-sr.statusBarHeight)-60,
    },
    titleStyle: {
        fontSize:16,
        color: '#FFFFFF',
    },
    tabBarStyle: {
        height:60,
        backgroundColor: '#7A7A7A',
    },
    tabBarShadowStyle: {
        height: 0,
        backgroundColor: '#7A7A7A',
    },
    icon: {
        width:30,
        height:30
    },
});
