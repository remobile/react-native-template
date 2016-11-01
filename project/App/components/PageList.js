'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    View,
    Text,
    Image,
    StyleSheet,
    ListView,
    TouchableHighlight,
    RefreshControl,
} = ReactNative;

const {STATUS_TEXT_HIDE, STATUS_START_LOAD, STATUS_HAVE_MORE, STATUS_NO_DATA, STATUS_ALL_LOADED, STATUS_LOAD_ERROR} = CONSTANTS.LISTVIEW_INFINITE.STATUS;

module.exports = React.createClass({
    getDefaultProps() {
        return {
            autoLoad: true,
            pageNo: 0,
            infiniteLoadStatus: STATUS_START_LOAD,
            style: {flex: 1},
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
    getInitialState() {
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.list = this.props.list||[];
        this.pageNo = this.props.pageNo;
        return {
            dataSource: this.ds.cloneWithRows(this.list),
            infiniteLoadStatus: this.props.infiniteLoadStatus,
        };
    },
    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(prevProps.listParam, this.props.listParam)) {
            this.refresh();
        }
    },
    getList(wait){
        var param = {
            ...this.props.listParam,
            pageNo: this.pageNo,
        };
        this.setState({infiniteLoadStatus: this.pageNo===0?STATUS_START_LOAD:STATUS_HAVE_MORE});
        POST(this.props.listUrl, param, this.getListSuccess, this.getListFailed, wait);
    },
    getListSuccess(data) {
        this.props.onGetList && this.props.onGetList(data, this.pageNo);
        if (data.success) {
            var list = data.context[this.props.listName];
            var infiniteLoadStatus = (!list.length && this.pageNo===0) ? STATUS_NO_DATA : list.length < CONSTANTS.PER_PAGE_COUNT ? STATUS_ALL_LOADED : STATUS_TEXT_HIDE;
            this.list = this.list.concat(list);
            this.setState({
                dataSource: this.ds.cloneWithRows(this.list),
                infiniteLoadStatus: infiniteLoadStatus
            });
        } else {
            if (this.props.ListFailedText) {
                this.setState({infiniteLoadStatus: this.props.ListFailedText});
            } else {
                this.getListFailed();
            }
        }
    },
    getListFailed() {
        this.pageNo--;
        this.setState({infiniteLoadStatus: STATUS_LOAD_ERROR});
    },
    onEndReached() {
        if (this.state.infiniteLoadStatus !== STATUS_TEXT_HIDE || this.props.disable) {
            return;
        }
        this.pageNo++;
        this.getList();
    },
    refresh() {
        if (this.isRefreshing()) {
            return;
        }
        this.list = [];
        this.setState({
            dataSource: this.ds.cloneWithRows(this.list),
        });
        this.pageNo = 0;
        this.getList();
    },
    isRefreshing() {
        return (this.state.infiniteLoadStatus===STATUS_START_LOAD || this.state.infiniteLoadStatus===STATUS_HAVE_MORE);
    },
    renderSeparator(sectionID, rowID) {
        return (
            <View
                style={styles.separator}
                key={sectionID+rowID}/>
        );
    },
    renderFooter() {
        var status = this.state.infiniteLoadStatus;
        return (
            <View style={styles.listFooterContainer}>
                <Text style={styles.listFooter}>
                    {
                        typeof status === 'string'? status :
                        status===STATUS_NO_DATA && this.props.ListFailedText ? this.props.ListFailedText :
                        CONSTANTS.LISTVIEW_INFINITE.TEXT[status]
                    }
                </Text>
            </View>
        )
    },
    render() {
        return (
            <View style={styles.container}>
                <ListView                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                    initialListSize={1}
                    enableEmptySections={true}
                    style={[{alignSelf:'stretch'}, this.props.style]}
                    dataSource={this.state.dataSource}
                    renderRow={this.props.renderRow}
                    renderSeparator={this.props.renderSeparator===undefined?this.renderSeparator:this.props.renderSeparator}
                    renderFooter={this.renderFooter}
                    refreshControl={
                        this.props.refreshEnable ?
                        <RefreshControl
                            refreshing={this.state.infiniteLoadStatus===STATUS_START_LOAD}
                            onRefresh={this.refresh}
                            title="正在刷新..." />
                        : null
                    }
                    />
            </View>
        )
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listFooterContainer: {
        height: 60,
        alignItems: 'center',
    },
    listFooter: {
        color: 'gray',
        fontSize: 14,
    },
    separator: {
        backgroundColor: '#DDDDDD',
        height: 1,
    },
});
