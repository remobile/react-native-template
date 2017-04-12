'use strict';

const ReactNative = require('react-native');
const {
    Navigator,
    Dimensions,
    PixelRatio,
    Platform,
    StatusBar,
    NativeModules,
} = ReactNative;

const SCREEN_WIDTH_BASE = 375;

const { width, height } = Dimensions.get('screen') || Dimensions.get('window'),
    pxielRatio = PixelRatio.get();

const { TotalNavHeight, NavBarHeight, StatusBarHeight } = Navigator.NavigationBar.Styles.General;

module.exports = {
    translucent: NativeModules.SplashScreen.translucent,
    w: SCREEN_WIDTH_BASE, // 屏幕的宽度
    h: (height - StatusBarHeight) * SCREEN_WIDTH_BASE / width, // 屏幕的高度（android不包含状态栏）
    fh: height * SCREEN_WIDTH_BASE / width, // 屏幕全屏的高度（android包含状态栏）
    tw: width, // 屏幕的真实宽度
    th: height - StatusBarHeight, // 屏幕的真实高度（android不包含状态栏）
    tfh: height, // 屏幕全屏的真实高度（android包含状态栏）
    ch: (height - StatusBarHeight - NavBarHeight) * SCREEN_WIDTH_BASE / width, // 界面的高度
    tch: height - StatusBarHeight - NavBarHeight, // 界面的真实高度
    statusBarHeight: StatusBar.currentHeight * SCREEN_WIDTH_BASE / width, // android状态栏高度
    trueStatusBarHeight: StatusBar.currentHeight, // android状态栏真实高度
    navbarHeight: NavBarHeight * SCREEN_WIDTH_BASE / width, // 导航栏的高度
    trueTotalNavHeight: NavBarHeight, // 导航栏的真实高度
    totalNavbarHeight: TotalNavHeight * SCREEN_WIDTH_BASE / width, // 导航栏的高度
    trueTotalNavbarHeight: TotalNavHeight, // 导航栏的真实高度
    pr: pxielRatio,
    s: (w) => { return w * width / SCREEN_WIDTH_BASE; },
    rs: (w) => { return w * SCREEN_WIDTH_BASE / width; },
};
