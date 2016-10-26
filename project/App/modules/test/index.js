'use strict';
var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    ListView,
    Image,
    TouchableOpacity,
    Navigator,
} = ReactNative;

var PersonInfo = require('../person/PersonInfo.js');
var TestImage = require('./image.js');
var QRCode = require('./qrcode.js');

var modules = [
    {title:'图片', image: app.img.common_point, module:TestImage},
    {title:'二维码', image: app.img.common_point, module:QRCode},
];


module.exports = React.createClass({
    statics: {
        title: CONSTANTS.APP_NAME,
        leftButton: { image: app.img.common_left_menu, handler: ()=>{
            app.navigator.push({
                component: PersonInfo,
                fromLeft: true,
            });
        }},
    },
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows(modules),

        };
    },
    _onPressRow(obj) {
        var route = {
            title: obj.title,
            component: obj.module,
        };
        app.navigator.push(route);
    },
    renderSeparator(sectionID, rowID) {
        return (
            <View style={styles.separator} key={rowID}/>
        );
    },
    renderRow(obj, sectionID, rowID) {
        return (
            <View key={rowID}>
                <TouchableOpacity
                    onPress={this._onPressRow.bind(null, obj)}
                    underlayColor="#EEB422">
                    <View style={styles.row}>
                        <Image
                            resizeMode='stretch'
                            source={obj.image}
                            style={styles.icon} />
                        <Text style={styles.title} >
                            {obj.title}
                        </Text>
                        <Image
                            resizeMode='contain'
                            source={app.img.common_go}
                            style={styles.arrow} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    },
    render: function() {
        return (
            <View style={styles.container}>
                <ListView
                    style={styles.list}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSeparator={this.renderSeparator}
                    />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
    },
    row: {
        height:60,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    list: {
        alignSelf:'stretch'
    },
    icon: {
        marginLeft: 10,
        width:25,
        height:25,
        marginRight: 10,
    },
    title: {
        width:sr.w-70
    },
    separator: {
        height: 1,
        backgroundColor: '#CCC'
    },
    arrow: {
        width: 15,
        height: 26,
    },
});
