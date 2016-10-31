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

var MessageContainer = require('./MessageContainer.js');

var DATA = [
    {
        avatar: app.img.login_alipay_button,
        name: '阿三',
        text: 'fangyunjiang\n:::9::8::7:方运江2342342342342342342342342342342342342342342342343\n12123',
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
    getInitialState() {
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: this.ds.cloneWithRows(DATA),
        };
    },
    renderRow(obj) {
        const {avatar, name, text, time, send} = obj;
        const wordsList = this.props.parseWordsListFromText(obj.text);
        return (
            <View style={styles.row}>
                { !send && <Image resizeMode='stretch' source={avatar} style={styles.avatar} /> }
                <View style={{flex:1}}>
                    <MessageContainer style={styles.message} send={send}>
                    {wordsList}
                    </MessageContainer>
                </View>
                { send && <Image resizeMode='stretch' source={avatar} style={styles.avatar} /> }
            </View>
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
                    pageSize={1}
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
    row: {
        width: sr.w,
        flexDirection: 'row',
        paddingVertical: 10,
        // backgroundColor: 'red',
        // justifyContent: 'flex-end',
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 20,
        marginHorizontal: 4,
    },
    message: {
        width: sr.w*2/3,
    },
});
