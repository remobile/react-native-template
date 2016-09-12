'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
} = ReactNative;

var Details = require('./MyNewsDetails.js');
var {Button, MessageBox, PageList} = COMPONENTS;

module.exports = React.createClass({
    statics: {
        title: '最新消息',
    },
    getInitialState() {
        return {
            showDeleteMessageBox: false,
        };
    },
    deleteNews(messageID) {
        this.messageID = messageID;
        this.setState({showDeleteMessageBox: true});
    },
    doCancel() {
        this.setState({showDeleteMessageBox: false});
    },
    doConfirmDelete() {
        var param = {
            userID: app.personal.info.userID,
            messageID: this.messageID,
        };
        POST(app.route.ROUTE_SUBMIT_DELNEWS, param, this.deleteSuccess, this.deleteFailed, true);
    },
    deleteSuccess(data) {
        if (data.success) {
            this.listView.updateList((list)=>{
                return _.reject(list, (item)=>item.messageID==this.messageID);
            });
            this.setState({
                showDeleteMessageBox: false,
            });
            Toast('删除成功');
        } else {
            this.deleteFailed();
            Toast(data.msg);
        }
    },
    deleteFailed() {
        this.setState({showDeleteMessageBox: false,});
    },
    goDetails(obj) {
        if (obj.state == 0) {
            this.listView.updateList((list)=>{
                _.find(list, (item)=>item.messageID==obj.messageID).state = 1;
                return list;
            });
            var param = {
                userID: app.personal.info.userID,
                messageID: obj.messageID,
            };
            POST(app.route.ROUTE_CHANGE_MESSAGE_STATE, param);
        }
        app.navigator.push({
            component: Details,
            passProps: { contentText: obj.content, time: obj.time},
        });
    },
    renderRow(obj) {
        return (
            <View>
                <TouchableHighlight
                    onPress={this.goDetails.bind(null, obj)}
                    underlayColor="#b4b4b4">
                    <View style={styles.ItemBg}>
                        <View style={styles.titleStyle}>
                            <Image
                                resizeMode='stretch'
                                source={obj.state==1 ? app.img.personal_news_read : app.img.personal_news}
                                style={styles.icon_item} />
                            <Text style={obj.state==1 ? styles.itemNameText2 : styles.itemNameText}>系统通知</Text>
                            <Text style={obj.state==1 ? styles.itemNumText2 : styles.itemNumText}>
                                {obj.time}
                            </Text>
                        </View>
                        <View style={styles.infoStyle}>
                            <Text
                                numberOfLines={1}
                                style={styles.itemContentText}>
                                {obj.content}
                            </Text>
                            <Button
                                onPress={this.deleteNews.bind(null, obj.messageID)}
                                style={styles.btnStyle}
                                textStyle={styles.btnStyleText}>
                                删  除
                            </Button>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    },
    render() {
        return (
            <View style={styles.container}>
                <PageList
                    ref={listView=>this.listView=listView}
                    renderRow={this.renderRow}
                    listParam={{userID: app.personal.info.userID}}
                    listName="newsList"
                    listUrl={app.route.ROUTE_SUBMIT_GETMYNEWS}
                    />
                {
                    this.state.showDeleteMessageBox &&
                    <MessageBox
                        content="是否删除已选中项?"
                        doCancel={this.doCancel}
                        doConfirm={this.doConfirmDelete} />
                }
            </View>
        )
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    ItemBg: {
        marginTop: 2,
        padding: 10,
        height: 85,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
    },
    titleStyle: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    infoStyle: {
        flex: 1,
        marginTop: 2,
        marginLeft: 30,
        flexDirection: 'row',
    },
    icon_item: {
        width: 25,
        height: 25,
    },
    itemNameText: {
        fontSize: 14,
        color: '#239fdb',
        alignSelf: 'center',
        marginLeft: 10,
    },
    itemNameText2: {
        fontSize: 14,
        color: '#666666',
        alignSelf: 'center',
        marginLeft: 10,
    },
    itemContentText: {
        flex: 4,
        fontSize: 15,
        marginRight: 5,
        color: 'gray',
        alignSelf: 'center',
    },
    itemNumText: {
        marginLeft: 20,
        fontSize: 14,
        alignSelf: 'center',
        color: '#239fdb',
    },
    itemNumText2: {
        marginLeft: 20,
        fontSize: 14,
        alignSelf: 'center',
        color: '#666666',
    },
    btnStyle: {
        flex: 1,
        marginRight: 3,
        borderRadius: 5,
        alignSelf: 'flex-end',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#239fdb',
    },
    btnStyleText: {
        fontSize: 14,
    },
});
