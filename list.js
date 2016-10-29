'use strict';

var React = require('react');var ReactNative = require('react-native');
var {
    View,
    Text,
    Image,
    StyleSheet,
    ListView,
    PanResponder,
} = ReactNative;
var ReactNativeComponentTree = require('react/lib/ReactNativeComponentTree');

var Button = require('@remobile/react-native-simple-button');
var SplashScreen = require('@remobile/react-native-splashscreen');

var data = {
    'A': [
        {name: '1'},
        {name: '2'},
        {name: '3'},
        {name: '4'},
        {name: '5'},
    ],
    'B': [
        {name: '1'},
        {name: '2'},
        {name: '3'},
        {name: '4'},
        {name: '5'},
    ],
    'C': [
        {name: '1'},
        {name: '2'},
        {name: '3'},
        {name: '4'},
        {name: '5'},
    ],
    'D': [
        {name: '1'},
        {name: '2'},
        {name: '3'},
        {name: '4'},
        {name: '5'},
    ],
    'E': [
        {name: '1'},
        {name: '2'},
        {name: '3'},
        {name: '4'},
        {name: '5'},
    ],
    'F': [
        {name: '1'},
        {name: '2'},
        {name: '3'},
        {name: '4'},
        {name: '5'},
    ],
};

const LETTERS = [0, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 1];

var AlphabetaList = React.createClass({
    onLetterPress(e) {
            console.log("=========", letter);
        // if (this.lastLetter != letter) {
        //     this.lastLetter = letter;
        //     this.props.onLetterPress(letter);
        // }
    },
    onLayout(sectionID, e) {
        var {height} = e.nativeEvent.layout;
        this.totalHeight = height;
        this.itemHeight = height/LETTERS.length;
    },
    render() {
        return (
            <View style={styles.alphabetaList} onTouchStart={this.onLetterPress} onTouchStart={this.onLetterPress}>
                <View onLayout={this.onLayout}>
                {
                    LETTERS.map((l)=>{
                        return (
                            <Text key={l} letter={l} style={styles.letterText}>{l===0?'↑':l===1?'#':l}</Text>
                        )
                    })
                }
            </View>
            </View>
        )
    }
});

module.exports = React.createClass({
    componentWillMount() {
        SplashScreen.hide();
    },
    getInitialState() {
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged : (s1, s2) => s1 !== s2
        });
        this.sectionData = this.getSectionData(data);
        return {
            dataSource: this.ds.cloneWithRowsAndSections(data),
            initialListSize: 0,
        };
    },
    getSectionData(data) {
        var sectionData = this.sectionData || {};
        var keys = _.keys(data);
        var preItem = {count: 0};
        keys.forEach((key)=>{
            var item = sectionData[key] || {};
            item.count = preItem.count+data[key].length;
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
        if (item.y == null) {
            this.needScrollSection = sectionID;
            this.setState({initialListSize: item.count});
        } else {
            this.listView.scrollTo({x: 0, y: item.y, animated: false});
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
            <View style={{backgroundColor: 'gray',}} onLayout={this.onLayout.bind(null, sectionID)}>
                <Text >{sectionID}</Text>
            </View>
        );
    },
    renderSeparator(sectionID, rowID) {
        return (
            <View style={styles.separator} key={sectionID+''+rowID}/>
        );
    },
    changePicture() {
        data.A.push({name: '6'});
        data.A.push({name: '7'});
        data.A.push({name: '8'});
        this.setState({dataSource: this.ds.cloneWithRowsAndSections(data)});
    },
    render() {
        const {letters} = this.props;
        const {initialListSize, dataSource} = this.state;
        return (
            <View style={styles.container}>
                <Button onPress={this.changePicture}>改变</Button>
                <View style={styles.listContainer}>
                    <ListView
                        ref={(ref)=>this.listView=ref}
                        style={styles.list}
                        initialListSize={initialListSize}
                        onEndReachedThreshold={10}
                        enableEmptySections={true}
                        dataSource={dataSource}
                        renderRow={this.renderRow}
                        renderSeparator={this.renderSeparator}
                        renderSectionHeader={this.renderSectionHeader}
                        />
                    <AlphabetaList onLetterPress={this.scrollToSection}/>
                </View>
            </View>
        )
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 64,
    },
    listContainer: {
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
    alphabetaList: {
        width: 20,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    letterText: {
        fontSize: 11,
        textAlign: 'center',
        color: '#555',
    },
});
