'use strict';
const React = require('react');const ReactNative = require('react-native');
const {
    Navigator,
    PixelRatio,
    StyleSheet,
    ScrollView,
    Text,
    View,
    Image,
} = ReactNative;

import TabNavigator from 'react-native-tab-navigator';
const Test = require('../test');
const Remobile = require('../remobile');
const Empty = require('./Empty.js');

const INIT_ROUTE_INDEX = 0;
const ROUTE_STACK = [
    { index: 0, component:  Test },
    { index: 1, component: Remobile },
    { index: 2, component: Empty },
    { index: 3, component: Empty },
];
if (CONSTANTS.ISSUE_IOS) {
    _.remove(ROUTE_STACK, (o) => o.index === 3);
}

const HomeTabBar = React.createClass({
    componentWillMount () {
        app.showMainScene = (i) => {
            const { title, leftButton, rightButton } = _.find(ROUTE_STACK, (o) => o.index === i).component;
            Object.assign(app.getCurrentRoute().component, {
                title: title,
                leftButton: leftButton,
                rightButton: rightButton,
            });
            this.props.onTabIndex(i);
            app.forceUpdateNavbar();
        };
    },
    componentDidMount () {
        app.hasLoadMainPage = true;
        app.toggleNavigationBar(true);
    },
    componentWillUnmount () {
        app.hasLoadMainPage = false;
    },
    getInitialState () {
        return {
            tabIndex: this.props.initTabIndex,
        };
    },
    handleWillFocus (route) {
        const tabIndex = route.index;
        this.setState({ tabIndex });
    },
    render () {
        const menus = [
            { index: 0, title: '首页', icon: app.img.home_home, selected: app.img.home_home_press },
            { index: 1, title: 'Remobile', icon: app.img.home_remobile, selected: app.img.home_remobile_press },
            { index: 2, title: '测试', icon: app.img.home_test, selected: app.img.home_test_press },
            { index: 3, title: '更多', icon: app.img.home_personal, selected: app.img.home_personal_press },
        ];
        if (CONSTANTS.ISSUE_IOS) {
            _.remove(menus, (o) => o.index === 3);
        }
        const TabNavigatorItems = menus.map((item) => {
            return (
                <TabNavigator.Item
                    key={item.index}
                    selected={this.state.tabIndex === item.index}
                    title={item.title}
                    titleStyle={styles.titleStyle}
                    selectedTitleStyle={styles.titleSelectedStyle}
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
            );
        });
        return (
            <View style={styles.tabs}>
                <TabNavigator
                    tabBarStyle={styles.tabBarStyle}
                    tabBarShadowStyle={styles.tabBarShadowStyle}
                    hidesTabTouch >
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
    getChildScene () {
        return this.scene;
    },
    renderScene (route, navigator) {
        return <route.component ref={(ref) => { if (ref)route.ref = ref; }} />;
    },
    render () {
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
                onDidFocus={(route) => {
                    const ref = this.scene = app.scene = route.ref;
                    ref && ref.onDidFocus && ref.onDidFocus();
                }}
                onWillFocus={(route) => {
                    if (this._navigator) {
                        const { routeStack, presentedIndex } = this._navigator.state;
                        const preRoute = routeStack[presentedIndex];
                        if (preRoute) {
                            const preRef = preRoute.ref;
                            preRef && preRef.onWillHide && preRef.onWillHide();
                        }
                    }
                    const ref = route.ref;
                    ref && ref.onWillFocus && ref.onWillFocus(true); // 注意：因为有initialRouteStack，在mounted的时候所有的页面都会加载，因此只有第一个页面首次不会调用，需要在componentDidMount中调用，其他页面可以调用
                }}
                configureScene={(route) => ({
                    ...app.configureScene(route),
                })}
                navigationBar={
                    <HomeTabBar
                        initTabIndex={INIT_ROUTE_INDEX}
                        onTabIndex={(index) => {
                            this._navigator.jumpTo(_.find(ROUTE_STACK, (o) => o.index === index));
                        }}
                        />
                }
                />
        );
    },
});

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        flex: 1,
    },
    tabs: {
        height: 50,
        width: sr.w,
        position: 'absolute',
        left: 0,
        top: sr.ch - 50,
    },
    titleStyle: {
        fontSize:10,
        color: '#929292',
    },
    titleSelectedStyle: {
        fontSize:10,
        color: '#DF3932',
    },
    tabBarStyle: {
        borderColor: '#EEEEEE',
        borderTopWidth: 1,
        height:50,
        backgroundColor: '#FEFCFD',
        alignItems: 'center',
    },
    tabBarShadowStyle: {
        height: 0,
        backgroundColor: '#EEEEEE',
    },
    icon: {
        width:22,
        height:22,
    },
});
