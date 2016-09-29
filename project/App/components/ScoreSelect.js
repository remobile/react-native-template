import React from 'react';
import {
    View,
    ScrollView,
} from 'react-native';

const ViewPager = React.createClass({
    componentWillMount() {
        this.count = this.props.children.length;
    },
    onScroll(e) {
        // android incompatible
        if (!e.nativeEvent.contentOffset) {
            e.nativeEvent.contentOffset = {x: e.nativeEvent.position * this.props.width};
        }
        this.updateIndex(e.nativeEvent.contentOffset.x);
    },
    updateIndex(x) {
        let {width, afterChange} = this.props;
        selectedIndex = Math.round(x / width);
        if (this.lastSelectedIndex!==selectedIndex && selectedIndex>=0 && selectedIndex<=this.count-1) {
            this.lastSelectedIndex = selectedIndex;
            if (afterChange) {
                afterChange(selectedIndex);
            }
        }
    },
    render() {
        let {width, height} = this.props;
        let pages = this.props.children.map((page, i) => {
            return (<View style={{width, height}} key={i}>{page}</View>);
        });
        return (
            <ScrollView ref="scrollview"
                horizontal={true}
                pagingEnabled={false}
                scrollEventThrottle={10}
                removeClippedSubviews={false}
                automaticallyAdjustContentInsets={false}
                directionalLockEnabled={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={this.props.style}
                onScroll={this.onScroll}>
                <View style={{width, height}}/>
                {pages}
                <View style={{width, height}}/>
            </ScrollView>
        );
    },
});

module.exports = ViewPager;
