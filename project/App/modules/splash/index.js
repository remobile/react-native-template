'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Image,
    Text,
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
        } else {
            this.getInfoError();
        }
    },
    getInfoError () {
        app.personal.clear();
        this.changeToLoginPage();
    },
    enterLoginPage () {
        this.setTimeout(() => {
            app.navigator.replace({
                component: Login,
            });
        }, 600);
    },
    changeToLoginPage () {
        if (app.updateMgr.needShowSplash) {
            this.setState({ renderSplashType: 1 });
        } else {
            this.enterLoginPage();
        }
    },
    enterHomePage () {
        this.setTimeout(() => {
            app.navigator.replace({
                component: Home,
            });
        }, 600);
    },
    changeToHomePage () {
        if (app.updateMgr.needShowSplash) {
            this.setState({ renderSplashType: 2 });
        } else {
            this.enterHomePage();
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
        if (app.personal.info) {
            this.doGetPersonalInfo();
        } else {
            this.changeToLoginPage();
        }
    },
    componentDidMount () {
        app.utils.until(
            () => app.updateMgr.initialized,
            (cb) => setTimeout(cb, 100),
            () => this.changeToNextPage()
        );
        this.setTimeout(() => {
            SplashScreen.hide();
        }, 100);
    },
    componentWillUnmount () {
        app.updateMgr.checkUpdate();
    },
    renderCommonSplash () {
        return (
            <Image
                resizeMode='stretch'
                source={app.img.splash_splash}
                style={styles.splash} />
        );
    },
    renderSwiperSplash () {
        return (
            <Swiper
                paginationStyle={styles.paginationStyle}
                dot={<View style={{ backgroundColor:'#FFFCF4', width: 8, height: 8, borderRadius: 4, marginLeft: 8, marginRight: 8 }} />}
                activeDot={<View style={{ backgroundColor:'#FFCD53', width: 16, height: 8, borderRadius: 4, marginLeft: 8, marginRight: 8 }} />}
                height={sr.th}
                loop={false}>
                {
                    [1, 2, 3, 4].map((i) => {
                        return (
                            <Image
                                key={i}
                                resizeMode='stretch'
                                source={app.img['splash_splash' + i]}
                                style={styles.bannerImage}>
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
        );
    },
    render () {
        return this.state.renderSplashType === 0 ? this.renderCommonSplash() : this.renderSwiperSplash();
    },
});

var styles = StyleSheet.create({
    splash: {
        width: sr.w,
        height: sr.h,
    },
    paginationStyle: {
        bottom: 30,
    },
    bannerImage: {
        width: sr.w,
        height: sr.h,
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
