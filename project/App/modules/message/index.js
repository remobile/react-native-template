'use strict';

var React = require('react');
var ReactNative = require('react-native');

var {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
} = ReactNative;

var MessageBox = require('./MessageBox.js');
var SplashScreen = require('@remobile/react-native-splashscreen');

const {STATUS_TEXT_HIDE, STATUS_START_LOAD, STATUS_HAVE_MORE, STATUS_NO_DATA, STATUS_ALL_LOADED, STATUS_LOAD_ERROR} = CONSTANTS.LISTVIEW_INFINITE.STATUS;

var DATA = [
    {
        avatar: app.img.login_alipay_button,
        name: '阿三',
        text: 'fangyunjiang:::9::8::7:方运江',
        time: '2016-09-04 12:11:00',
    },
    {
        avatar: app.img.login_alipay_button,
        name: '阿三',
        text: 'fangyunjiang:::9::8::7:方运江',
        time: '2016-09-04 12:11:00',
    },
    {
        avatar: app.img.login_qq_button,
        name: '阿三',
        text: 'fangyunjiang:::9::8::7:方运江',
        time: '2016-09-04 12:11:00',
        send: true,
    },
    {
        avatar: app.img.login_qq_button,
        name: '阿三',
        text: 'fangyunjiang:::9::8::7:方运江',
        time: '2016-09-04 12:11:00',
        send: true,
    },
    {
        avatar: app.img.login_alipay_button,
        name: '阿三',
        text: 'fangyunjiang:::9::8::7:方运江',
        time: '2016-09-04 12:11:00',
    },
];

module.exports = React.createClass({
    componentWillMount() {
        SplashScreen.hide();
    },
    getInitialState() {
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: this.ds.cloneWithRows(DATA),
        };
    },
    renderRow(obj) {
        return (
            <MessageBox backgroundColor='#A6DC3E' style={styles.message}>
                <Text>还好吧！！sadfsadfsadfjhasdkjfhsadkjfhsadkjfhsadkjfhsadkjfhsadkjfhsadkjfhkj</Text>
                <Text>还好吧！！</Text>
                <Text>还好吧！！</Text>
                <Text>还好吧！！</Text>
                <Text>还好吧！！</Text>
                <Text>还好吧！！</Text>
                <Text>还好吧！！</Text>
                <Text>还好吧！！</Text>
                <Text>还好吧！！</Text>
            </MessageBox>
        )
    },
    render() {
        return (
            <View style={styles.container}>
                <ListView
                    enableEmptySections={true}
                    keyboardShouldPersistTaps={true}
                    automaticallyAdjustContentInsets={false}
                    initialListSize={20}
                    pageSize={20}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    />
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        width: sr.w*2/3,
    },
});
