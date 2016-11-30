'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    ScrollView,
} = ReactNative;

var Card = React.createClass({
    render() {
        const {width, height, top, marginLeft, mounted, renderRow} = this.props;
        return (
            mounted ?
            <View style={[styles.card, {height, width, top, marginLeft}]}>
                {renderRow(width, height)}
            </View>
            : null
        );
    }
});

module.exports = React.createClass({
    getInitialState() {
        this.maxSize = this.props.list.length;
        this.totalHeight = this.maxSize*this.props.height;
        this.lastTop = 0;
        this.listRecord = [];
        return {
            y: 0,
            mounted: false,
        };
    },
    componentDidMount() {
        this.scrollView.scrollTo({y:(this.maxSize-2)*this.props.height});
        setTimeout(()=>{
            this.setState({mounted: true});
        }, 100);
    },
    onScroll({nativeEvent}) {
        this.setState({y: nativeEvent.contentOffset.y-this.props.height*2});
    },
    onTouchStart() {
        this._touchStarted = true;
    },
    onTouchMove() {
        this._touchStarted = false;
    },
    onTouchEnd(e) {
        if (this._touchStarted) {
            this.clickCard(e.nativeEvent);
        }
        this._touchStarted = false;
    },
    clickCard(e) {
        const {offsetLeft, offsetTop, onClickCard} = this.props;
        let {pageX, pageY} = e;
        pageX -= offsetLeft;
        pageY -= offsetTop;
        const list = this.listRecord;
        let lastItem = list[0];
        let selectIndex = -1;
        let i = 0;
        for (let len = list.length; i < len; i++) {
            if (i != 0) {
                let item = list[i];
                if (item.type === -1) {
                    lastItem = item;
                    continue;
                }
                if (item.type === 1) {
                    break;
                }
                if (pageY > lastItem.top && pageY < item.top) {
                    selectIndex = i-1;
                    break;
                } else {
                    lastItem = item;
                }
            }
        }
        if (selectIndex === -1 && pageY > lastItem.top && pageY < lastItem.bottom) {
            selectIndex = i - 1;
        }
        if (selectIndex !== -1) {
            let selectItem = list[selectIndex];
            if (pageX > selectItem.left && pageX < selectItem.right) {
                this.props.onClickCard(selectIndex);
            }
        }
    },
    getCardPosition(i, height, y, panelHeight, panelWidth) {
        let offset = i - y/height;
        let h, w, top, type = 0;
        if (offset < 0) {
            w = 0;
            h = 0;
            top = 0;
            type = -1;
            if (offset+1 > 0) {
                w = panelWidth/2;
                h = panelWidth/2;
                type = 0;
            }
        } else {
            w = (offset*0.2+1)*panelWidth/2;
            if (w > panelWidth) {
                w = 0;
                h = 0;
                top = 0;
                type = 1;
            } else {
                h = w/panelWidth*height;
                top = Math.pow(offset, 2)*(0.04)*panelHeight;
            }
        }
        this.lastTop = top;
        let pos = {left: (panelWidth-w)/2, top, right: (panelWidth+w)/2, bottom: h+top, type};
        this.listRecord[i] = pos;
        return {
            height: h,
            width: w,
            top: top,
            marginLeft: pos.left,
        }
    },
    render() {
        const {list, height, panelHeight, panelWidth, renderRow} = this.props;
        const {y, mounted} = this.state;
        return (
            <View style={{flex: 1}}>
                <View style={styles.cardContainer}>
                    {
                        list.map((item, i)=>{
                            const position = this.getCardPosition(i, height, y, panelHeight, panelWidth);
                            return (
                                <Card key={i} {...position} mounted={mounted} renderRow={renderRow.bind(null, item, i)}/>
                            )
                        })
                    }
                </View>
                <View style={{flex: 1}}>
                    <ScrollView
                        ref={(ref)=>{this.scrollView = ref}}
                        showsVerticalScrollIndicator={false}
                        onScroll={this.onScroll}
                        onTouchStart={this.onTouchStart}
                        onTouchMove={this.onTouchMove}
                        onTouchEnd={this.onTouchEnd}
                        scrollEventThrottle ={100}
                        >
                        <View style={{height: this.totalHeight}} />
                    </ScrollView>
                </View>
            </View>
        );
    }
})

var styles = StyleSheet.create({
    cardContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        overflow: 'hidden',
    },
    card: {
        position: 'absolute',
    },
});
