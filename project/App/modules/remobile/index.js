'use strict';
const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    View,
    Text,
    ListView,
    Image,
    TouchableOpacity,
    Navigator,
} = ReactNative;

const SplashScreen = require('@remobile/react-native-splashscreen');
const PersonInfo = require('../person/PersonInfo.js');
const Dialogs = require('./react-native-dialogs');
const Camera = require('./react-native-camera');
const Sqlite = require('./react-native-sqlite-storage');
const Contacts = require('./react-native-contacts');
const FileTransfer = require('./react-native-file-transfer');
const MarqueeLabel = require('./react-native-marquee-label');
const Zip = require('./react-native-zip');
const RefreshInfiniteListview = require('./react-native-refresh-infinite-listview');
const Panel = require('./react-native-3d-panel');
const Marquee = require('./react-native-marquee');
const CameraRollPicker = require('./react-native-camera-roll-picker');
const ImageCrop = require('./react-native-image-crop');
const IndexedListview = require('./react-native-indexed-listview');
const ClipRect = require('./react-native-clip-rect');
const CardList = require('./react-native-card-list');
const QRCode = require('./react-native-qrcode-local-image');
const CardSwiper = require('./react-native-card-swiper');
const Echarts = require('./react-native-echarts');
const Module = require('./react-native-module');
const CacheModule = require('./react-native-cache-module');
const SmartKeyboard = require('./react-native-smart-keyboard');
const Cocos2dx = require('./react-native-cocos2dx');

const modules = [
    { title:'react-native-cocos2dx', image: app.img.common_point, module:Cocos2dx },
    { title:'react-native-smart-keyboard', image: app.img.common_point, module:SmartKeyboard },
    { title:'react-native-cache-module', image: app.img.common_point, module:CacheModule },
    { title:'react-native-module', image: app.img.common_point, module:Module },
    { title:'react-native-echarts', image: app.img.common_point, module:Echarts },
    { title:'react-native-card-swiper', image: app.img.common_point, module:CardSwiper },
    { title:'react-native-qrcode-local-image', image: app.img.common_point, module:QRCode },
    { title:'react-native-card-list', image: app.img.common_point, module:CardList },
    { title:'react-native-clip-rect', image: app.img.common_point, module:ClipRect },
    { title:'react-native-indexed-listview', image: app.img.common_point, module:IndexedListview },
    { title:'react-native-image-crop', image: app.img.common_point, module:ImageCrop },
    { title:'react-native-camera-roll-picker', image: app.img.common_point, module:CameraRollPicker },
    { title:'react-native-marquee', image: app.img.common_point, module:Marquee },
    { title:'react-native-3d-panel', image: app.img.common_point, module:Panel },
    { title:'react-native-refresh-infinite-listview', image: app.img.common_point, module:RefreshInfiniteListview },
    { title:'react-native-dialogs', image: app.img.common_point, module:Dialogs },
    { title:'react-native-camera', image: app.img.common_point, module:Camera },
    { title:'react-native-sqlite-storage', image: app.img.common_point, module:Sqlite },
    { title:'react-native-contacts', image: app.img.common_point, module:Contacts },
    { title:'react-native-file-transfer', image: app.img.common_point, module:FileTransfer },
    { title:'react-native-zip', image: app.img.common_point, module:Zip },
    { title:'react-native-marquee-label', image: app.img.common_point, module:MarqueeLabel },
];

module.exports = React.createClass({
    statics: {
        title: CONSTANTS.APP_NAME,
        leftButton: { image: app.img.common_left_menu, handler: () => {
            app.navigator.push({
                component: PersonInfo,
                fromLeft: true,
            });
        } },
    },
    componentWillMount () {
        app.toggleNavigationBar(true);
        SplashScreen.hide();
    },
    getInitialState: function () {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return {
            dataSource: ds.cloneWithRows(modules),

        };
    },
    _onPressRow (obj) {
        const route = {
            title: obj.title,
            component: obj.module,
        };
        app.navigator.push(route);
    },
    renderSeparator (sectionID, rowID) {
        return (
            <View style={styles.separator} key={rowID} />
        );
    },
    renderRow (obj, sectionID, rowID) {
        return (
            <View key={rowID}>
                <TouchableOpacity
                    onPress={this._onPressRow.bind(null, obj)}
                    underlayColor='#EEB422'>
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
        );
    },
    render: function () {
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
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        height:60,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    list: {
        alignSelf:'stretch',
    },
    icon: {
        marginLeft: 10,
        width:25,
        height:25,
        marginRight: 10,
    },
    title: {
        width:sr.w - 70,
    },
    separator: {
        height: 1,
        backgroundColor: '#CCC',
    },
    arrow: {
        width: 15,
        height: 26,
    },
});
