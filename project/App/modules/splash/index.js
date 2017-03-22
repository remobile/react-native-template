'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
} = ReactNative;

import Swiper from 'react-native-swiper';
var TimerMixin = require('react-timer-mixin');
var SplashScreen = require('@remobile/react-native-splashscreen');
var Login = require('../login/Login.js');
var Home = require('../home/index.js');

module.exports = React.createClass({
    mixins: [TimerMixin],
    getInitialState () {
        return {
            renderSplashType: 0,
        };
    },
    doGetPersonalInfo () {
        var param = {
            userID: app.personal.info.userID,
        };
        POST(app.route.ROUTE_GET_PERSONAL_INFO, param, this.getPersonalInfoSuccess, this.getInfoError);
    },
    getPersonalInfoSuccess (data) {
        if (data.success) {
            var context = data.context;
            context['userID'] = app.personal.info.userID;
            context['phone'] = app.personal.info.phone;
            app.personal.set(context);
            this.changeToHomePage();
            app.personal.setNeedLogin(false);
        } else {
            this.getInfoError();
        }
    },
    getInfoError () {
        app.personal.setNeedLogin(true);
        this.changeToLoginPage();
    },
    enterLoginPage (needHideSplashScreen) {
        app.navigator.replace({
            component: Login,
        });
        needHideSplashScreen && SplashScreen.hide();
    },
    changeToLoginPage () {
        if (app.updateMgr.needShowSplash) {
            this.setState({ renderSplashType: 1 }, () => {
                SplashScreen.hide();
            });
        } else {
            this.enterLoginPage(true);
        }
    },
    enterHomePage (needHideSplashScreen) {
        app.navigator.replace({
            component: Home,
        });
        needHideSplashScreen && SplashScreen.hide();
    },
    changeToHomePage () {
        if (app.updateMgr.needShowSplash) {
            this.setState({ renderSplashType: 2 }, () => {
                SplashScreen.hide();
            });
        } else {
            this.enterHomePage(true);
        }
    },
    enterNextPage () {
        app.updateMgr.setNeedShowSplash(false);
        if (this.state.renderSplashType === 1) {
            this.enterLoginPage();
        } else {
            this.enterHomePage();
        }
    },
    changeToNextPage () {
        if (app.personal.needLogin) {
            this.changeToLoginPage();
        } else {
            this.doGetPersonalInfo();
        }
    },
    componentDidMount () {
        app.utils.until(
            () => app.personal.initialized && app.updateMgr.initialized && app.navigator,
            (cb) => setTimeout(cb, 100),
            () => this.changeToNextPage()
        );
    },
    componentWillUnmount () {
        app.updateMgr.checkUpdate();
    },
    onLayout (e) {
        var { height } = e.nativeEvent.layout;
        if (this.state.height !== height) {
            this.heightHasChange = !!this.state.height;
            this.setState({ height });
        }
    },
    renderSwiperSplash () {
        const { height } = this.state;
        const marginBottom = (!this.heightHasChange || Math.floor(height) === Math.floor(sr.th)) ? 0 : 30;
        return (
            <View style={{ flex: 1 }} onLayout={this.onLayout}>
                {
                    height &&
                    <Swiper
                        paginationStyle={styles.paginationStyle}
                        dot={<View style={{ backgroundColor:'#FFFCF4', width: 8, height: 8, borderRadius: 4, marginLeft: 8, marginRight: 8, marginBottom }} />}
                        activeDot={<View style={{ backgroundColor:'#FFCD53', width: 16, height: 8, borderRadius: 4, marginLeft: 8, marginRight: 8, marginBottom }} />}
                        height={height}
                        loop={false}>
                        {
                            [1, 2, 3, 4].map((i) => {
                                return (
                                    <Image
                                        key={i}
                                        resizeMode='stretch'
                                        source={app.img['splash_splash' + i]}
                                        style={[styles.bannerImage, { height }]}>
                                        {
                                            i === 4 &&
                                            <TouchableOpacity
                                                style={styles.enterButtonContainer}
                                                onPress={this.enterNextPage}>
                                                <Image resizeMode='stretch' style={styles.enterButton} source={app.img.splash_start} />
                                            </TouchableOpacity>
                                        }
                                    </Image>
                                );
                            })
                        }
                    </Swiper>
                }
            </View>
        );
    },
    render () {
        return this.state.renderSplashType === 0 ? null : this.renderSwiperSplash();
    },
});

var styles = StyleSheet.create({
    paginationStyle: {
        bottom: 30,
    },
    bannerImage: {
        width: sr.w,
    },
    enterButtonContainer: {
        position: 'absolute',
        width: 165,
        height: 40,
        left: (sr.w - 165) / 2,
        bottom: 80,
        alignItems:'center',
        justifyContent: 'center',
    },
    enterButton: {
        width: 140,
        height: 36,
    },
});
