'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Animated,
    ScrollView,
} = ReactNative;


var {PageList} = COMPONENTS;

module.exports = React.createClass({
    statics: {
        title: '收入明细',
        leftButton: {handler: ()=>{app.scene.goBack()}},
    },
    componentWillMount() {
        app.toggleNavigationBar(true);
    },
    goBack() {
        app.navigator.pop();
    },
    renderRow(obj){
        return(
            <View style={styles.listItem}>
                <Text style={styles.listItemTextBlack}>{obj.taskName}</Text>
                <View style={styles.listMoneyView}>
                    <Text style={styles.listItemTextFlag}>¥</Text>
                    <Text style={styles.listItemTextRed}>{obj.reward}</Text>
                </View>
            </View>
        )
    },
    render() {
        var info = app.personal.info;
        return (
            <View style={styles.container}>
                <PageList
                    renderRow={this.renderRow}
                    listParam={{phone: app.personal.info.phone}}
                    listName="list"
                    listUrl={app.route.ROUTE_GET_INCOME_LIST}
                    ListFailedText="暂无数据"
                    refreshEnable={true}
                    />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#ececec',
    },
    listItem: {
        height:40,
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection: 'row',
        backgroundColor:'white',
        marginVertical: 2,
        paddingHorizontal: 10,
    },
    listMoneyView: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        paddingHorizontal: 5,
    },
    listItemTextBlack: {
        paddingHorizontal: 5,
        color: 'black',
        fontSize: 18,
        fontWeight: '100',
        textAlign: 'center',
        overflow: 'hidden',
    },
    listItemTextRed: {
        color: 'red',
        fontSize: 18,
        fontWeight: '100',
        textAlign: 'center',
        overflow: 'hidden',
    },
    listItemTextFlag: {
        color: 'red',
        fontSize: 18,
        fontWeight: '100',
        textAlign: 'center',
        overflow: 'hidden',
    },
});
