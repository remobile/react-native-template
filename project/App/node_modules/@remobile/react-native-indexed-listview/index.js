'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    ListView,
} = ReactNative;
var _ = require('lodash');
var ReactNativeComponentTree = require('react/lib/ReactNativeComponentTree');

var AlphabetaList = React.createClass({
    getDefaultProps() {
        return {
            letters: [0, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 1],
        }
    },
    onTouchMove(e) {
        var index = Math.floor(e.nativeEvent.locationY/this.itemHeight);
        var letter = this.props.letters[index];
        if (this.lastLetter != letter) {
            this.lastLetter = letter;
            this.props.onLetterPress(letter);
        }
    },
    onLayout(e) {
        var {height} = e.nativeEvent.layout;
        this.itemHeight = height/this.props.letters.length;
    },
    render() {
        const {letters, alphabetaListStyle, letterStyle} = this.props;
        return (
            <View style={alphabetaListStyle || styles.alphabetaList}>
                <View onLayout={this.onLayout}>
                    {
                        letters.map((l)=>{
                            return (
                                <Text key={l} letter={l} style={letterStyle || styles.letterStyle}>{l===0?'↑':l===1?'#':l}</Text>
                            )
                        })
                    }
                    <View style={styles.touchLayer}  onTouchStart={this.onTouchMove} onTouchMove={this.onTouchMove}/>
                </View>
            </View>
        )
    }
});

module.exports = React.createClass({
    getDefaultProps() {
        return {
            list: [],
        }
    },
    getInitialState() {
        const {list} = this.props;
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged : (s1, s2) => s1 !== s2
        });
        this.sectionData = this.getSectionData(list);
        return {
            dataSource: this.ds.cloneWithRowsAndSections(list),
            initialListSize: 0,
        };
    },
    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.list, this.props.list)) {
            const {list} = nextProps;
            this.sectionData = this.getSectionData(list);
            this.setState({
                dataSource: this.ds.cloneWithRowsAndSections(list),
            });
        }
    },
    getSectionData(list) {
        var sectionData = this.sectionData || {};
        var keys = _.keys(list);
        var preItem = {count: 0};
        keys.forEach((key)=>{
            var item = sectionData[key] || {};
            item.count = preItem.count+list[key].length;
            preItem = item;
            sectionData[key] = item;
        });
        return sectionData;
    },
    onLayout(sectionID, e) {
        var {y} = e.nativeEvent.layout;
        var sectionData = this.sectionData;
        sectionData[sectionID].y = y;
        if (this.needScrollSection == sectionID) {
            this.listView.scrollTo({x: 0, y, animated: false});
        }
    },
    scrollToSection(sectionID) {
        var item = this.sectionData[sectionID];
        if (item) {
            if (item.y == null) {
                this.needScrollSection = sectionID;
                this.setState({initialListSize: item.count});
            } else {
                this.listView.scrollTo({x: 0, y: item.y, animated: false});
            }
        }
    },
    renderRow(obj, sectionID, rowID) {
        return (
            <View style={{paddingVertical:50,}}>
                <Text>{obj.name}</Text>
            </View>
        )
    },
    renderSectionHeader(obj, sectionID) {
        return (
            <View style={styles.section} onLayout={this.onLayout.bind(null, sectionID)}>
                <Text >{sectionID}</Text>
            </View>
        );
    },
    renderSeparator(sectionID, rowID) {
        return (
            <View style={styles.separator} key={sectionID+'_'+rowID}/>
        );
    },
    render() {
        const {renderRow, renderSectionHeader, renderSeparator, letters, alphabetaListStyle, letterStyle} = this.props;
        const {initialListSize, dataSource} = this.state;
        return (
            <View style={styles.container}>
                <ListView
                    ref={(ref)=>this.listView=ref}
                    style={styles.list}
                    initialListSize={initialListSize}
                    onEndReachedThreshold={10}
                    enableEmptySections={true}
                    dataSource={dataSource}
                    renderRow={renderRow}
                    renderSeparator={renderSeparator || this.renderSeparator}
                    renderSectionHeader={renderSectionHeader || this.renderSectionHeader}
                    />
                <AlphabetaList onLetterPress={this.scrollToSection} {...{letters, alphabetaListStyle, letterStyle}}/>
            </View>
        )
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    list: {
        flex: 1,
    },
    separator: {
        backgroundColor: '#DDDDDD',
        height: 1,
    },
    section: {
        backgroundColor: '#DDDDDD',
        paddingLeft: 10,
    },
    alphabetaList: {
        width: 20,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    letterStyle: {
        fontSize: 12,
        textAlign: 'center',
        color: '#555',
    },
    touchLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
