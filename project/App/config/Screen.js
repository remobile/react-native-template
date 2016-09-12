'use strict';

var ReactNative = require('react-native');
var {
    Navigator,
    Dimensions,
    PixelRatio,
    Platform,
    NativeModules,
} = ReactNative;

var SCREEN_WIDTH_BASE = 375;
var SCREEN_HEIGHT_BASE  = 667;

var {width, height} = Dimensions.get('window'),
    pxielRatio = PixelRatio.get();

var {TotalNavHeight, NavBarHeight} = Navigator.NavigationBar.Styles.General;
var statusBarHeight = (Platform.OS === "android")?NativeModules.UtilsModule.statusBarHeight/pxielRatio:0;
module.exports = {
    w: SCREEN_WIDTH_BASE,
    h: SCREEN_WIDTH_BASE/width*height,
    mw: SCREEN_WIDTH_BASE/2,
    mh: SCREEN_WIDTH_BASE/width*height/2,
    whr: width/height,
    tw: width,
    th: height,
    tmw: width/2,
    tmh: height/2,
    pr: pxielRatio,
    statusBarHeight: statusBarHeight,
    totalNavHeight: TotalNavHeight,
    navBarHeight: NavBarHeight,
    ws: (w)=>{return w*width/SCREEN_WIDTH_BASE},
    hs: (h)=>{return h*height/SCREEN_HEIGHT_BASE},
};
