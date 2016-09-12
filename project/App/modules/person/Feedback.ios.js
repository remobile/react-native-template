'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Animated,
    TextInput,
    Text,
    TouchableOpacity,
    Navigator,
} = ReactNative;

var {Button} = COMPONENTS;

module.exports = React.createClass({
    doSubmit() {
        if (!this.state.content) {
            Toast('请填写您需要反馈的内容');
            return;
        }
        var param = {
            userID: app.personal.info.userID,
            content: this.state.content,
        };
        POST(app.route.ROUTE_SUBMIT_FEEDBACK, param, this.doSubmitSuccess);
    },
    doSubmitSuccess(data) {
        if (data.success) {
            Toast('提交成功');
            app.closeModal();
        } else {
            Toast(data.msg);
        }
    },
    getInitialState() {
        return {
            opacity: new Animated.Value(0),
            content: '',
        };
    },
    componentDidMount() {
        Animated.timing(this.state.opacity, {
                toValue: 1,
                duration: 500,
            }
        ).start();
    },
    closeModal() {
        Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: 500,
            }
        ).start(()=>{
            app.closeModal();
        });
    },
    render() {
        return (
            <Animated.View style={[styles.overlayContainer, {opacity: this.state.opacity}]}>
                <View style={[styles.container, {top: Navigator.NavigationBar.Styles.General.TotalNavHeight+sr.statusBarHeight}]}>
                    <TextInput
                        style={styles.contentInput}
                        onChangeText={(text) => this.setState({content: text})}
                        value={this.state.content}
                        multiline={true}
                        placeholder={'请输入要反馈给我们的意见'}
                        />
                    <View style={styles.tabContainer}>
                        <TouchableOpacity
                            onPress={this.doSubmit}
                            style={[styles.tabButton, {backgroundColor:'#4FC1E9'}]}>
                            <Text style={styles.tabText} >提交</Text>
                            <View style={[styles.makeup, {right:0,backgroundColor:'#4FC1E9'}]}></View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.closeModal}
                            style={[styles.tabButton, {backgroundColor:'#A0D26F'}]}>
                            <Text style={styles.tabText} >返回</Text>
                            <View style={[styles.makeup, {left:0,backgroundColor:'#A0D26F'}]}></View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        width:sr.w*5/6,
        height:sr.h*4/5,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        borderRadius:10,
        position: 'absolute',
        left: sr.w*1/12,
    },
    contentInput: {
        flex: 1,
        width:sr.w*5/6,
        fontSize: 20,
        padding:10,
        backgroundColor:'#FFFFFF',
    },
    overlayContainer: {
        position:'absolute',
        bottom: 0,
        width:sr.w,
        height:sr.h,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    tabContainer: {
        width:sr.w*5/6,
        height: 50,
        marginTop: 20,
        marginHorizontal: 10,
        borderRadius:10,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    tabButton: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 10,
    },
    tabText: {
        fontSize: 18,
        color:'#FFFFFF',
    },
    makeup: {
        top: 0,
        width: 10,
        height: 50,
        position: 'absolute'
    },
});
