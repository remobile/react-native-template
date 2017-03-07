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
STATUS_GET_VERSION = 0,
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
ERROR_FAILED_INSTALL = 3,
ERROR_UNZIP_JS = 4;

var PROGRESS_WIDTH = sr.tw*0.7;
var {Button, ProgressBar} = COMPONENTS;

var ProgressInfo = React.createClass({
    render() {
        const { progress } = this.props;
        if (progress < 1000) {
            return (
                <View>
                    <Text>{this.props.title} [{progress}%]</Text>
                    <ProgressBar
                        fillStyle={{}}
                        backgroundStyle={{backgroundColor: '#cccccc', borderRadius: 2}}
                        style={{marginTop: 10, width:PROGRESS_WIDTH}}
                        progress={progress/100.0}
                        />
                    <View style={styles.progressText}>
                        <Text>0</Text>
                        <Text>100</Text>
                    </View>
                </View>
            );
        } else {
            let size = progress/1000/1024/1024;
            return (
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text>{this.props.title} [{size.toFixed(2)} M]</Text>
                </View>
            );
        }
    }
});

module.exports = React.createClass({
    getInitialState() {
        const {options} = this.props;
        return {
            options,
            status: !options ? STATUS_GET_VERSION : options.newVersion ? STATUS_HAS_VEW_VERSION : STATUS_HAS_NOT_VEW_VERSION,
            progress: 0,
        };
    },
    componentWillMount() {
        if (!this.state.options) {
            Update.checkVersion({
                versionUrl: app.route.ROUTE_VERSION_INFO_URL,
                iosAppId: CONSTANTS.IOS_APPID,
            }).then((options)=>{
                this.setState({options, status: !options ? STATUS_GET_VERSION_ERROR : options.newVersion ? STATUS_HAS_VEW_VERSION : STATUS_HAS_NOT_VEW_VERSION});
            })
        }
    },
    onError(errCode) {
        if (errCode == ERROR_DOWNKOAD_APK) {
            this.setState({status: STATUS_DOWNKOAD_APK_ERROR});
        } else if (errCode == ERROR_DOWNKOAD_JS) {
            this.setState({status: STATUS_DOWNKOAD_JS_ERROR});
        } else if (errCode == ERROR_FAILED_INSTALL) {
            this.setState({status: STATUS_FAILED_INSTALL_ERROR});
        } else if (errCode == ERROR_UNZIP_JS) {
            this.setState({status: STATUS_UNZIP_JS_ERROR});
        }
    },
    doUpdate() {
        const {jsVersionCode, trackViewUrl} = this.state.options;
        if (jsVersionCode !== undefined) {
            Update.updateJS({
                jsVersionCode,
                jsbundleUrl: app.isandroid?app.route.ROUTE_JS_ANDROID_URL:app.route.ROUTE_JS_IOS_URL,
                onDownloadJSProgress:(progress)=>{this.setState({status: STATUS_DOWNLOAD_JS_PROGESS,progress})},
                onUnzipJSProgress:(progress)=>{this.setState({status: STATUS_UNZIP_JS_PROGESS,progress})},
                onUnzipJSEnd:()=>{this.setState({status: STATUS_UPDATE_END})},
                onError:(errCode)=>{this.onError(errCode)},
            });
        } else {
            Update.updateApp({
                trackViewUrl,
                androidApkUrl:app.route.ROUTE_APK_URL,
                androidApkDownloadDestPath:'/sdcard/yxjqd.apk',
                onDownloadAPKProgress:(progress)=>{this.setState({status: STATUS_DOWNLOAD_APK_PROGESS,progress})},
                onError:(errCode)=>{this.onError(errCode)},
            });
        }
    },
    render() {
        var components = {};
        const {currentVersion, newVersion, description} = this.state.options||{currentVersion:Update.getVersion()};
        components[STATUS_GET_VERSION] = (
            <Text style={styles.textInfo}>正在获取版本</Text>
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
            <Text style={styles.textInfo}>你放弃了安装</Text>
        );
        components[STATUS_HAS_VEW_VERSION] = (
            <View style={styles.textInfoContainer}>
                <Text style={styles.textInfo}>发现新版本{newVersion}</Text>
                <View style={styles.descriptionContainer}>
                    {
                        description && description.map((item, i)=>{
                            return (
                                <Text style={styles.textInfo} key={i}>{(i+1)+'. '+item}</Text>
                            )
                        })
                    }
                </View>
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
                        source={app.img.personal_logo}
                        style={styles.logo}
                        />
                    <Text style={styles.app_name}>赢销截拳道 V{currentVersion}</Text>
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
    },
    logoContainer: {
        alignItems:'center',
        marginTop: 52,
    },
    logo: {
        width: 83,
        height: 83,
    },
    app_name: {
        marginTop: 13,
        fontSize: 16,
        color: '#727272',
    },
    functionContainer: {
        flex: 1,
        width: sr.w,
        marginTop: 51,
        alignItems:'center',
    },
    button_layer: {
        width:178,
        height:49,
        borderRadius: 4,
        left: (sr.w-178)/2,
        position: 'absolute',
        bottom: 120,
        backgroundColor: '#DE3031',
    },
    button_text: {
        fontSize: 18,
        fontWeight: '400',
        color: '#FFFFFF',
        alignSelf: 'center',
        fontFamily: 'STHeitiSC-Medium',
    },
    progressText: {
        flexDirection:'row',
        justifyContent:'space-between',
        width: sr.w*0.7,
    },
    textInfoContainer: {
        flex: 1,
        width: sr.w,
    },
    textInfo: {
        color: '#000000',
        fontSize: 18,
        marginBottom: 6,
        textAlign: 'center',
    },
});
