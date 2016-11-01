'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    ActivityIndicator,
} = ReactNative;

var InvertibleScrollView = require('react-native-invertible-scroll-view');
var MessageContainer = require('./MessageContainer.js');

/*loading more status change graph
*
* STATUS_NONE->[STATUS_LOADING]
* STATUS_LOADING->[STATUS_NONE, STATUS_NO_DATA, STATUS_ALL_LOADED, STATUS_LOAD_ERROR]
* STATUS_ALL_LOADED->[STATUS_NONE]
*/
const STATUS_NONE = 0,
STATUS_LOADING = 1,
STATUS_NO_DATA = 2,
STATUS_ALL_LOADED = 3,
STATUS_LOAD_ERROR = 4;

module.exports = React.createClass({
    getDefaultProps() {
        return {
            autoLoad: true,
            pageNo: 0,
            loadStatus: STATUS_NONE,
            perPageCount: 10,
            url: app.route.ROUTE_GET_MESSAGE_LIST,
        };
    },
    getInitialState() {
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.list = this.props.list||[];
        this.pageNo = this.props.pageNo;
        return {
            dataSource: this.ds.cloneWithRows(this.list),
            loadStatus: this.props.loadStatus,
        };
    },
    componentDidMount() {
        if (this.props.autoLoad) {
            this.getList();
        }
    },
    updateList(callback) {
        this.list = callback(this.list);
        this.setState({
            dataSource: this.ds.cloneWithRows(this.list),
        });
    },
    getList(){
        var param = {
            ...this.props.listParam,
            pageNo: this.pageNo,
        };
        this.setState({loadStatus: STATUS_LOADING});
        POST(this.props.url, param, this.getListSuccess, this.getListFailed);
    },
    getListSuccess(data) {
        const {perPageCount} = this.props;
        if (data.success) {
            var list = data.list;
            var loadStatus = (!list.length && this.pageNo===0) ? STATUS_NO_DATA : list.length < perPageCount ? STATUS_ALL_LOADED : STATUS_NONE;
            this.list = this.list.concat(list);
            this.setState({
                dataSource: this.ds.cloneWithRows(this.list),
                loadStatus: loadStatus
            });
        } else {
            this.getListFailed();
        }
    },
    getListFailed() {
        this.pageNo--;
        this.setState({loadStatus: STATUS_LOAD_ERROR});
    },
    onEndReached() {
        if (this.state.loadStatus !== STATUS_NONE) {
            return;
        }
        this.pageNo++;
        this.getList();
    },
    sendMessage(obj) {
        this.list.unshift({
            avatar: app.img.login_weixin_button,
            text: obj.text,
            name: '阿三',
            time: '2016-09-04 12:11:00',
            send: true,
        });
        this.setState({
            dataSource: this.ds.cloneWithRows(this.list),
        });
    },
    onTouchStart() {
        this._touchStarted = true;
    },
    onTouchMove() {
        this._touchStarted = false;
    },
    onTouchEnd() {
        if (this._touchStarted) {
            this.props.hideKeyboard();
        }
        this._touchStarted = false;
    },
    scrollTo(options) {
        this.scrollRef.scrollTo(options);
    },
    renderFooter() {
        const {loadStatus} = this.state;
        if (loadStatus===STATUS_NONE || loadStatus===STATUS_NO_DATA || loadStatus===STATUS_ALL_LOADED || (loadStatus===STATUS_LOAD_ERROR && this.pageNo===0)) {
            return null;
        }
        return (
            <View style={styles.footer}>
                {
                    loadStatus === STATUS_LOADING ?
                    <ActivityIndicator
                      color='gray'
                      size='small'
                      style={[styles.activityIndicator, this.props.activityIndicatorStyle]}
                    />
                    :
                    <Text style={styles.errorText}>加载错误</Text>
                }
            </View>
        )
    },
    renderScrollComponent(props) {
        const {invertibleScrollViewProps} = this.props;
        return (
            <InvertibleScrollView
                {...props}
                inverted
                onTouchStart={this.onTouchStart}
                onTouchMove={this.onTouchMove}
                onTouchEnd={this.onTouchEnd}
                ref={component => this.scrollRef = component}
            />
        );
    },
    renderRow(obj) {
        const {avatar, name, text, time, send} = obj;
        const wordsList = this.props.parseWordsListFromText(obj.text);
        const source = _.isString(avatar) ? {uri: avatar} : avatar;
        return (
            <View style={styles.row}>
                { !send && <Image resizeMode='stretch' source={source} style={styles.avatar} /> }
                <View style={{flex:1}}>
                    <MessageContainer style={styles.message} send={send}>
                    {wordsList}
                    </MessageContainer>
                </View>
                { !!send && <Image resizeMode='stretch' source={source} style={styles.avatar} /> }
            </View>
        )
    },
    render() {
        return (
            <View style={styles.container}>
                <ListView
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={100}
                    enableEmptySections={true}
                    keyboardShouldPersistTaps={true}
                    automaticallyAdjustContentInsets={false}
                    initialListSize={20}
                    pageSize={1}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderFooter={this.renderFooter}
                    renderScrollComponent={this.renderScrollComponent}
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
    footer: {
        height: 20,
        alignItems: 'center',
    },
    errorText: {
        fontSize: 12,
        color: 'red',
    },
    row: {
        width: sr.w,
        flexDirection: 'row',
        paddingVertical: 10,
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
