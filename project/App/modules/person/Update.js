'use strict';
var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    Image,
} = ReactNative;

var Update = require('@remobile/react-native-update');

var
STATUS_FETCHING_VERSION = 0,
STATUS_HAS_VEW_VERSION = 1,
STATUS_HAS_NOT_VEW_VERSION = 2,
STATUS_DOWNLOAD_APK_PROGESS = 3,
STATUS_DOWNLOAD_JS_PROGESS = 4,
STATUS_UNZIP_JS_PROGESS = 5,
STATUS_GET_VERSION_ERROR = 6,
STATUS_DOWNKOAD_APK_ERROR = 7,
STATUS_DOWNKOAD_JS_ERROR = 8,
STATUS_UNZIP_JS_ERROR = 9,
STATUS_FAILED_INSTALL_ERROR = 10,
STATUS_UPDATE_END = 11;

var
ERROR_NULL = 0,
ERROR_DOWNKOAD_APK = 1,
ERROR_DOWNKOAD_JS = 2,
ERROR_GET_VERSION = 3,
ERROR_FAILED_INSTALL = 4,
ERROR_UNZIP_JS = 5;

var PROGRESS_WIDTH = sr.tw*0.7;
var {Button, ProgressBar} = COMPONENTS;

var ProgressInfo = React.createClass({
    render() {
        return (
            <View>
                <Text>{this.props.title} [{this.props.progress}%]</Text>
                <ProgressBar
                    fillStyle={{}}
                    backgroundStyle={{backgroundColor: '#cccccc', borderRadius: 2}}
                    style={{marginTop: 10, width:PROGRESS_WIDTH}}
                    progress={this.props.progress/100.0}
                    />
                <View style={styles.progressText}>
                    <Text>0</Text>
                    <Text>100</Text>
                </View>
            </View>
        );
    }
});

module.exports = React.createClass({
    componentDidMount() {
        var update = new Update({
            versionUrl: app.route.ROUTE_VERSION_INFO_URL,
            jsbundleUrl:app.isandroid?app.route.ROUTE_JS_ANDROID_URL:app.route.ROUTE_JS_IOS_URL,
            androidApkUrl:app.route.ROUTE_APK_URL,
            androidApkDownloadDestPath:'/sdcard/jfbsample.apk',
            iosAppId: CONSTANTS.IOS_APPID,
            needUpdateApp: this.needUpdateApp,
            needUpdateJS: this.needUpdateJS,
            onDownloadAPKStart:()=>{},
            onDownloadAPKProgress:(progress)=>{this.setState({status: STATUS_DOWNLOAD_APK_PROGESS,progress:progress})},
            onDownloadAPKEnd:()=>{},
            onDownloadJSStart:()=>{},
            onDownloadJSProgress:(progress)=>{this.setState({status: STATUS_DOWNLOAD_JS_PROGESS,progress:progress})},
            onDownloadJSEnd:()=>{},
            onUnzipJSStart:()=>{},
            onUnzipJSProgress:(progress)=>{this.setState({status: STATUS_UNZIP_JS_PROGESS,progress:progress})},
            onUnzipJSEnd:()=>{this.setState({status: STATUS_UPDATE_END})},
            onNewestVerion:()=>{this.setState({status: STATUS_HAS_NOT_VEW_VERSION})},
            onError:(errCode)=>{this.onError(errCode)},
        })
        update.start();
    },
    onError(errCode) {
        if (errCode == ERROR_GET_VERSION) {
            this.setState({status: STATUS_GET_VERSION_ERROR});
        } else if (errCode == ERROR_DOWNKOAD_APK) {
            this.setState({status: STATUS_DOWNKOAD_APK_ERROR});
        } else if (errCode == ERROR_DOWNKOAD_JS) {
            this.setState({status: STATUS_DOWNKOAD_JS_ERROR});
        } else if (errCode == ERROR_FAILED_INSTALL) {
            this.setState({status: STATUS_FAILED_INSTALL_ERROR});
        } else if (errCode == ERROR_UNZIP_JS) {
            this.setState({status: STATUS_UNZIP_JS_ERROR});
        }
    },
    getShowVerion(version) {
        return version.versionName+'.'+version.jsVersionCode;
    },
    doUpdate() {
        var callback = this.updateCallback;
        this.updateCallback = null;
        callback(0);
    },
    needUpdateApp(oldVersion, newVersion, callback) {
        this.updateCallback = callback;
        this.setState({status: STATUS_HAS_VEW_VERSION, newVersion:this.getShowVerion(newVersion)});
    },
    needUpdateJS(oldVersion, newVersion, callback) {
        this.updateCallback = callback;
        this.setState({status: STATUS_HAS_VEW_VERSION, newVersion:this.getShowVerion(newVersion)});
    },
    getInitialState() {
        return {
            status:STATUS_FETCHING_VERSION,
            newVersion: '',
            progress: 0,
        };
    },
    render() {
        var components = {};
        components[STATUS_FETCHING_VERSION] = (
            <Text style={styles.textInfo}>正在获取版本信息...</Text>
        );
        components[STATUS_HAS_NOT_VEW_VERSION] = (
            <Text style={styles.textInfo}>当前版本已经是最新版本</Text>
        );
        components[STATUS_GET_VERSION_ERROR] = (
            <Text style={styles.textInfo}>获取版本信息失败，请稍后再试</Text>
        );
        components[STATUS_DOWNKOAD_APK_ERROR] = (
            <Text style={styles.textInfo}>下载apk文件失败，请稍后再试</Text>
        );
        components[STATUS_DOWNKOAD_JS_ERROR] = (
            <Text style={styles.textInfo}>下载js bundle失败，请稍后再试</Text>
        );
        components[STATUS_UNZIP_JS_ERROR] = (
            <Text style={styles.textInfo}>解压js bundle失败，请稍后再试</Text>
        );
        components[STATUS_FAILED_INSTALL_ERROR] = (
            <Text style={styles.textInfo}>您放弃了安装</Text>
        );
        components[STATUS_HAS_VEW_VERSION] = (
            <View>
                <Text style={styles.textInfo}>发现新版本{this.state.newVersion}</Text>
                <Button onPress={this.doUpdate} style={styles.button_layer} textStyle={styles.button_text}>立即更新</Button>
            </View>
        );
        components[STATUS_DOWNLOAD_APK_PROGESS] = (
            <ProgressInfo
                title="正在下载APK"
                progress={this.state.progress} />
        );
        components[STATUS_DOWNLOAD_JS_PROGESS] = (
            <ProgressInfo
                title="正在下载Bundle文件"
                progress={this.state.progress} />
        );
        components[STATUS_UNZIP_JS_PROGESS] = (
            <ProgressInfo
                title="正在解压Bundle文件"
                progress={this.state.progress} />
        );
        components[STATUS_UPDATE_END] = (
            <Text>正在重启...</Text>
        );
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        resizeMode='stretch'
                        source={app.img.splash_logo}
                        style={styles.logo}
                        />
                    <Text style={styles.app_name}>{CONSTANTS.APP_NAME+' V'}{this.getShowVerion(Update.getVersion())}</Text>
                </View>
                <View style={styles.functionContainer}>
                    {components[this.state.status]}
                </View>
            </View>
        );
    },
});


var styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
    },
    logoContainer: {
        flex:2,
        alignItems:'center',
        marginTop: 50,
    },
    logo: {
        margin: 10,
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    app_name: {
        fontSize: 16,
        color: '#868989',
    },
    functionContainer: {
        flex: 3,
        alignItems:'center',
        justifyContent: 'center',
    },
    button_layer: {
        height: 45,
        width: 110,
        borderRadius: 6,
        marginTop: 20,
        alignSelf: 'center',
        backgroundColor: '#A0D26F',
    },
    button_text: {
        alignSelf: 'center',
    },
    progressText: {
        flexDirection:'row',
        justifyContent:'space-between',
        width: sr.w*0.7,
    },
    textInfo: {
        color: '#A8B5B8',
        fontSize: 18,
    },
});
