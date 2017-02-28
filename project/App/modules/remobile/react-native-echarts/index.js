'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    WebView,
} = ReactNative;

var UserAgeInfo = require('./UserAgeInfo.js');
var UserSexInfo = require('./UserSexInfo.js');
var ConsumeInfo = require('./ConsumeInfo.js');
var ReleaseCardInfo = require('./ReleaseCardInfo.js');

const CHILD_ITEM = [
    '发卡信息',
    '消费信息',
    '用户性别',
    '用户年龄层',
];
const statistics = {
    releaseCardInfo: {
        today: 100,
        past: 10000,
        remain: 100000,
    },
    consumeInfo: {
        today: [5, 20, 36, 10, 10, 20, 5, 20, 36],
        week: [5, 20, 36, 10, 10, 20, 5],
        month: [5, 20, 36],
    },
    userSexInfo: {
        male: 1000,
        female: 5000,
    },
    userAgeInfo: [5, 20, 36, 10, 10, 20, 10, 20],
};

module.exports = React.createClass({
    getInitialState(){
        return{
            currentIndex: 0,
        }
    },
    onPress(index){
        this.setState({currentIndex: index})
    },
    headItem(itemStr, i){
        return(
            <TouchableOpacity
                onPress={this.onPress.bind(null, i)}
                style={styles.itemView}>
                <Text style={this.state.currentIndex === i?styles.selectText:styles.text}>
                    {itemStr}
                </Text>
                {this.state.currentIndex === i&&<View style={styles.lineView}/>}
            </TouchableOpacity>
        );
    },
    headView(){
        return(
            <View style={styles.textView}>
                {this.headItem(CHILD_ITEM[0], 0)}
                {this.headItem(CHILD_ITEM[1], 1)}
                {this.headItem(CHILD_ITEM[2], 2)}
                {this.headItem(CHILD_ITEM[3], 3)}
            </View>
        );
    },
    render() {
        const {currentIndex} = this.state;
        return (
            <View style={styles.container}>
                <this.headView />
                <View style={currentIndex===0?styles.containerWebView:styles.containerWebViewHide}>
                    <ReleaseCardInfo data={statistics.releaseCardInfo}/>
                </View>
                <View style={currentIndex===1?styles.containerWebView:styles.containerWebViewHide}>
                    <ConsumeInfo data={statistics.consumeInfo}/>
                </View>
                <View style={currentIndex===2?styles.containerWebView:styles.containerWebViewHide}>
                    <UserSexInfo data={statistics.userSexInfo}/>
                </View>
                <View style={currentIndex===3?styles.containerWebView:styles.containerWebViewHide}>
                    <UserAgeInfo data={statistics.userAgeInfo}/>
                </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#E6EBEC',
    },
    containerWebView: {
        flex: 1,
    },
    containerWebViewHide: {
        position:'absolute',
        left:-sr.tw,
        top:0,
        overflow: 'hidden',
    },
    textView: {
        marginTop: 20,
        height: 45,
        flexDirection: 'row',
    },
    itemView: {
        width: sr.w/4,
        height: 43,
    },
    lineView: {
        marginTop: 10,
        height: 2,
        backgroundColor: '#34a9b1',
    },
    selectText: {
        fontSize: 14,
        color: '#34a9b1',
        alignSelf: 'center',
    },
    text: {
        fontSize: 14,
        color: '#666666',
        alignSelf: 'center',
    },
});
