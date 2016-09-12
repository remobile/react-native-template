'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Image,
    Navigator,
    BackAndroid,
    NativeAppEventEmitter,
} = ReactNative;

var Camera = require('@remobile/react-native-camera');
var FileTransfer = require('@remobile/react-native-file-transfer');

var {Button, DImage, ActionSheet} = COMPONENTS;

module.exports = React.createClass({
    statics: {
        title: '设置头像',
        leftButton: {handler: ()=>app.scene.goBack()},
    },
    getInitialState() {
        return {
            actionSheetVisible: false,
            userhead: app.personal.info.headImg,
        };
    },
    selectPicture() {
        this.doCloseActionSheet();
        var options = {
            quality: 30,
            targetWidth: 240,
            targetHeight: 240,
            allowEdit: true,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        };
        Camera.getPicture(options, (filePath) => {
            this.uploadUserHead(filePath);
        });
    },
    goBack() {
        if (this.uploadOn) {
            Toast('正在上传头像，请稍后再退出');
            return;
        }
        app.navigator.pop();
    },
    takePicture() {
        this.doCloseActionSheet();
        var options = {
            quality: 30,
            allowEdit: true,
            targetWidth: 240,
            targetHeight: 240,
            cameraDirection: Camera.Direction.FRONT,
            destinationType: Camera.DestinationType.FILE_URI,
        };
        Camera.getPicture(options, (filePath) => {
            this.uploadUserHead(filePath);
        });
    },
    uploadUserHead(filePath) {
        this.setState({userhead: filePath});
        var options = {};
        options.fileKey = 'file';
        options.fileName = filePath.substr(filePath.lastIndexOf('/')+1);
        options.mimeType = 'image/jpeg';
        options.params = {
            userID:app.personal.info.userID
        };
        this.uploadOn = true;
        UPLOAD(filePath, app.route.ROUTE_UPDATE_FILE, options, (progress) => console.log(progress),
            this.uploadSuccessCallback, this.uploadErrorCallback, true);
    },
    uploadSuccessCallback(data) {
        if (data.success) {
            var context = data.context;
            app.personal.setUserHead(context.url);
            app.navigator.pop();
        } else {
            Toast("上传失败");
            this.setState({userhead: app.personal.info.headImg});
        }
        this.uploadOn = false;
    },
    uploadErrorCallback() {
        this.uploadOn = false;
        this.setState({userhead: app.personal.info.headImg});
    },
    doCloseActionSheet() {
        this.setState({actionSheetVisible:false});
    },
    doShowActionSheet() {
        this.setState({actionSheetVisible:true});
    },

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.backgroundImage, styles.overlay]} />
                <View style={styles.headContainer}>
                  <DImage
                      resizeMode='cover'
                      defaultSource={app.img.personal_default_head}
                      source={{uri:this.state.userhead}}
                      style={styles.image_head}
                      />
                    <Button onPress={this.doShowActionSheet} style={styles.button_layer} textStyle={styles.button_text}>点击设置头像</Button>
                </View>
                <ActionSheet
                    visible={this.state.actionSheetVisible}
                    cancelText="返   回"
                    onCancel={this.doCloseActionSheet} >
                    <ActionSheet.Button onPress={this.selectPicture}>从相册中选择</ActionSheet.Button>
                    <ActionSheet.Button onPress={this.takePicture}>自    拍</ActionSheet.Button>
                </ActionSheet>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        left: 0,
        top: -5,
        width: sr.w,
        height: sr.h-Navigator.NavigationBar.Styles.General.TotalNavHeight+5,
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 1)',
    },
    headContainer: {
        flex:1,
        alignItems:'center',
        marginTop: 50,
    },
    image_head: {
        margin: 10,
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    button_layer: {
        paddingVertical: 10,
        borderRadius: 6,
        paddingHorizontal: 30,
        marginTop: 20,
        backgroundColor: '#A0D26F',
    },
    button_text: {
        alignSelf: 'center',
    }
});
