'use strict';
const React = require('react');
const ReactNative = require('react-native');
const {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
} = ReactNative;

import Echarts from '@remobile/react-native-echarts';

module.exports = React.createClass({
    getInitialState () {
        return {
            data: this.props.data,
        };
    },
    render () {
        const { today, past, remain } = this.state.data;
        const sections = [
            { name: '今日发卡数', count: app.utils.toThousands(today), color: '#008fe3' },
            { name: '往日已发卡数', count: app.utils.toThousands(past), color: '#8bd6c5' },
            { name: '剩余发卡数', count: app.utils.toThousands(remain), color: '#00a680' },
        ];
        const option = {
            series: [{
                name: '发卡数量',
                type: 'pie',
                radius : '60%',
                data: [ { value:today, name:'今日发卡数' },
                { value:past, name:'往日已发卡数' },
                { value:remain, name:'剩余发卡数' }],
            }],
        };
        return (
            <ScrollView>
                <Echarts option={option} height={sr.s(250)} />
                <View style={styles.totalView}>
                    <Text style={styles.littleView}>
                        总人数：{app.utils.toThousands(today + past)}
                    </Text>
                </View>
                <View style={styles.bottomView}>
                    {
                        sections.map((item, i) => {
                            return (
                                <View key={i} style={styles.itemView}>
                                    <View style={styles.leftView}>
                                        <Text style={[styles.littleView, { marginLeft:3, width: 20 }]}>
                                            {i + 1}
                                        </Text>
                                        <View style={[styles.squirView, { backgroundColor: item.color }]} />
                                        <Text style={styles.littleView}>
                                            {item.name}
                                        </Text>
                                    </View>
                                    <Text style={[styles.littleView, { marginRight: 39 }]}>
                                        {item.count}
                                    </Text>
                                    <View style={styles.lineView} />
                                </View>
                            );
                        })
                    }
                </View>
            </ScrollView>
        );
    },
});

const styles = StyleSheet.create({
    totalView: {
        height: 50,
        width: sr.w,
        alignItems: 'center',
    },
    bottomView: {
        height: 120,
        width: sr.w,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemView: {
        height: 37,
        width: sr.w,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftView: {
        height: 37,
        marginLeft: 39,
        flexDirection: 'row',
        alignItems: 'center',
    },
    squirView: {
        height: 25,
        width: 25,
        marginRight: 10,
    },
    littleView: {
        fontSize: 12,
        color: '#888888',
    },
    lineView: {
        position: 'absolute',
        height: 1,
        width: sr.w - 78,
        bottom: 0,
        left: 39,
        backgroundColor: '#aab9ba',
    },
});
