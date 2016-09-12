'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    Image,
    View,
    TextInput,
    ListView,
    Text,
    TouchableOpacity,
    ScrollView,
} = ReactNative;

var Camera = require('@remobile/react-native-camera');
var Player = require('./Player.js');

var {Button, Label} = COMPONENTS;

var PlayerItem = React.createClass({
    render() {
        var {url, thumb} = this.props.data;
        return (
            this.props.playing ?
            <View style={styles.playerView}>
                <Player uri={url} />
            </View>
            :
            <View style={styles.playerView}>
                <DImage
                    resizeMode='stretch'
                    defaultSource={app.img.common_default}
                    source={{uri: thumb}}
                    style={styles.playerContainer}>
                    <TouchableOpacity
                        style={styles.video_icon_container}
                        onPress={this.props.onPress}>
                        <Image
                            resizeMode='stretch'
                            source={app.img.task_play}
                            style={styles.video_icon}>
                        </Image>
                    </TouchableOpacity>
                </DImage>
            </View>
        )
    }
});

module.exports = React.createClass({
    componentDidMount() {
        app.mediaFileMgr.resetItem();
        app.toggleNavigationBar(true);
    },
    goBack() {
        app.navigator.pop();
    },
    getInitialState() {
        return {
            anonymous: true,
            name: '',
            organization: '',
            phone: '',
            images: [],
            videos: [],
            yourName: '',
            yourPhone: '',
            yourAddress: '',
            yourIdentity: '',
        };
    },
    doSumbit() {
        const {anonymous, name, organization, phone, yourName, yourPhone, yourAddress, yourIdentity} = this.state;
        if (!name.trim().length) {
            Toast('被举报人的姓名不能为空');
            return;
        }
        if (!organization.trim().length) {
            Toast('被举报人的单位不能为空');
            return;
        }
        if (!anonymous && !yourName.trim().length) {
            Toast('不匿名情况下您的姓名不能为空');
            return;
        }
        if (!anonymous && !yourPhone.trim().length) {
            Toast('不匿名情况下您的电话不能为空');
            return;
        }
        var param = {
            name,
            organization,
            phone,
        };
        // POST(app.route.ROUTE_ACCUSATIONS, param, this.doSubmitSuccess);
    },
    doSubmitSuccess(data) {
        if (data.success) {
            Toast('提交成功');
            app.mediaFileMgr.startTryUploadTasks(data.context.accusationId);
            this.goBack();
        } else {
            Toast(data.msg);
        }
    },
    selectVideo() {
        var options = {
            quality: 100,
            allowEdit: false,
            destinationType: Camera.DestinationType.FILE_URI,
            mediaType:Camera.MediaType.VIDEO,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        };
        Camera.getPicture(options, (filePath) => {
            app.mediaFileMgr.addMediaFile(filePath, false).then((videos)=>{
                this.setState({videos});
            });
        });
    },
    selectPicture() {
        var options = {
            quality: 100,
            allowEdit: false,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        };
        Camera.getPicture(options, (filePath) => {
            app.mediaFileMgr.addMediaFile(filePath, true).then((images)=>{
                this.setState({images});
            });
        });
    },
    changeAnonymousState() {
        this.setState({anonymous: !this.state.anonymous});
    },
    render() {
        const {anonymous, name, organization, phone, images, videos, yourName, yourPhone, yourAddress, yourIdentity} = this.state;
        return (
            <ScrollView style={styles.container}>
                <Label img={app.img.common_point}>被举报人的姓名</Label>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="必填"
                        onChangeText={(text) => this.setState({name: text})}
                        value={name}
                        style={styles.textInput}
                        />
                </View>
                <Label img={app.img.common_point}>被举报人的单位</Label>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="必填"
                        onChangeText={(text) => this.setState({organization: text})}
                        value={organization}
                        style={styles.textInput}
                        />
                </View>
                <Label img={app.img.common_point}>被举报人的电话</Label>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="可选"
                        onChangeText={(text) => this.setState({phone: text})}
                        value={phone}
                        style={styles.textInput}
                        />
                </View>
                <View style={styles.container}>
                    {
                        images.map((item, i)=>{
                            item.url = item.url?item.url.replace(/^\/Exhibition/, CONSTANTS.BASE_SERVER):'';
                            item.thumb = item.thumb?item.thumb.replace(/^\/Exhibition/, CONSTANTS.BASE_SERVER):'';
                            return (
                                <View style={styles.imageView} key={i}>
                                    <Image
                                        resizeMode='stretch'
                                        defaultSource={app.img.common_default}
                                        source={{uri: item.url}}
                                        style={styles.image}
                                        />
                                </View>
                            )
                        })
                    }
                    {
                        videos.map((item, i)=>{
                            item.url = item.url?item.url.replace(/^\/Exhibition/, CONSTANTS.BASE_SERVER):'';
                            item.thumb = item.thumb?item.thumb.replace(/^\/Exhibition/, CONSTANTS.BASE_SERVER):'';
                            return (
                                <View style={styles.videoView} key={i}>
                                    <PlayerItem
                                        key={i}
                                        playing={playingIndex===i}
                                        onPress={()=>{this.setState({playingIndex: i})}}
                                        data={item}/>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={styles.addView}>
                    <TouchableOpacity
                        style={styles.add_icon_container}
                        onPress={this.selectPicture}>
                        <Image
                            resizeMode='stretch'
                            source={app.img.task_plus_image}
                            style={styles.add_icon}>
                        </Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.add_icon_container}
                        onPress={this.selectVideo}>
                        <Image
                            resizeMode='stretch'
                            source={app.img.task_plus_video}
                            style={styles.add_icon}>
                        </Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.anonymousContainer}>
                    <TouchableOpacity onPress={this.changeAnonymousState}>
                        <Image
                            resizeMode='cover'
                            source={anonymous?app.img.common_check:app.img.common_no_check}
                            style={styles.anonymous_icon}
                            />
                    </TouchableOpacity>
                    <Text style={styles.anonymous_text}>  匿名提交 </Text>
                </View>
                {
                    !anonymous&&
                    <View>
                        <Label img={app.img.common_point}>您的姓名</Label>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="必填"
                                onChangeText={(text) => this.setState({yourName: text})}
                                value={yourName}
                                style={styles.textInput}
                                />
                        </View>
                        <Label img={app.img.common_point}>您的电话</Label>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="必填"
                                onChangeText={(text) => this.setState({yourPhone: text})}
                                value={yourPhone}
                                style={styles.textInput}
                                />
                        </View>
                        <Label img={app.img.common_point}>您的身份证号码</Label>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="可选"
                                onChangeText={(text) => this.setState({yourIdentity: text})}
                                value={yourIdentity}
                                style={styles.textInput}
                                />
                        </View>
                        <Label img={app.img.common_point}>您的住址</Label>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="可选"
                                onChangeText={(text) => this.setState({yourAddress: text})}
                                value={yourAddress}
                                style={styles.textInput}
                                />
                        </View>
                    </View>
                }
                <View style={styles.btnContainer}>
                    <Button onPress={this.doSumbit} style={styles.btnSumbit} textStyle={styles.btnSumbitText}>提     交</Button>
                </View>
            </ScrollView>
        )
    }
});

var NORMAL_WIDTH = sr.w;
var NORMAL_HEIGHT = NORMAL_WIDTH*2/3;
var ITEM_WIDTH = sr.w-52;
var PROGRESS_WIDTH = sr.ws(ITEM_WIDTH);
var styles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: 25,
    },
    inputContainer: {
        height: 50,
        borderRadius: 10,
        paddingLeft: 8,
        borderWidth: 1,
        borderColor: '#D7D7D7',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        overflow: 'hidden',
        alignItems:'center',
    },
    textInput: {
        height:40,
        width: 250,
        fontSize:14,
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
    },
    videoView: {
        marginVertical: 5,
        marginTop:8,
        backgroundColor: '#ececec',
    },
    addView: {
        marginVertical: 20,
        marginHorizontal: 10,
        backgroundColor: '#ececec',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    imageView: {
        marginVertical: 5,
        marginTop:8,
        backgroundColor: '#ececec',
    },
    image: {
        width: sr.w -52,
        height: 193/330*(ITEM_WIDTH),
        alignSelf:'center',
    },
    btnContainer: {
        height: 56,
        marginTop: 20,
        marginBottom: 30,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    add_icon_container: {
        height: 80,
        width: 80,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems:'center',
    },
    add_icon: {
        height: 80,
        width: 80,
    },
    playerView: {
        height: 193/330*(ITEM_WIDTH),
        justifyContent: 'center',
        alignItems:'center',
        alignSelf:'center',
        overflow:"hidden",
    },
    playerContainer: {
        width: ITEM_WIDTH,
        height: 193/330*(ITEM_WIDTH),
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#ececec',
    },
    video_icon_container: {
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems:'center',
    },
    video_icon: {
        height: 40,
        width: 40,
    },
    btnSumbit: {
        marginHorizontal: 10,
        paddingVertical: 16,
        width: sr.mw-40,
    },
    btnSumbitText: {
        fontSize: 20,
        fontWeight: '500',
    },
    anonymousContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    anonymous_icon: {
        height: 18,
        width: 18,
    },
    anonymous_text: {
        fontSize: 13,
        color: '#B2B3B4',
    },
});
