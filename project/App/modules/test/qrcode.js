'use strict';
import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import BarcodeScanner from 'react-native-barcode-scanner-universal';

module.exports = React.createClass({
    onBarCodeRead(code) {
        var {data} = code;
        try {
            data = JSON.parse(data);
            Toast(data);
        } catch (e) {
            Toast("扫描失败");
            return;
        }
    },
    render () {
        return (
            <View style={styles.container}>
                <BarcodeScanner
                    onBarCodeRead={this.onBarCodeRead}
                    style={styles.camera}>
                    {
                        !app.isandroid &&
                        <View style={styles.rectangleContainer}>
                            <View style={styles.rectangleTop} />
                            <View style={styles.rectangleMiddle}>
                                <View style={styles.rectangleLeft} />
                                <View style={styles.rectangleMiddleMiddle}>
                                    <View style={[styles.makeup, styles.makeupTL]} />
                                    <View style={[styles.makeup, styles.makeupTR]} />
                                    <View style={[styles.makeup, styles.makeupDL]} />
                                    <View style={[styles.makeup, styles.makeupDR]} />
                                </View>
                                <View style={styles.rectangleRight} />
                            </View>
                            <View style={styles.rectangleBottom}>
                                <Text style={styles.info}>
                                    将二维码放入框内，即可自动扫描
                                </Text>
                            </View>
                        </View>
                    }
                </BarcodeScanner>
            </View>
        )
    }
});

var OVERLAY = 'rgba(0, 0, 0, 0.2)';
var BORDER = 2;
var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        width: sr.w,
    },
    rectangleContainer: {
        flex: 1,
    },
    rectangleTop: {
        flex: 1,
        backgroundColor: OVERLAY,
    },
    rectangleMiddle: {
        height: 250,
        flexDirection: 'row',
    },
    rectangleBottom: {
        flex: 1,
        backgroundColor: OVERLAY,
        alignItems: 'center',
    },
    rectangleLeft: {
        flex:1,
        backgroundColor: OVERLAY,
    },
    rectangleMiddleMiddle: {
        width:250,
    },
    rectangleRight: {
        flex:1,
        backgroundColor: OVERLAY,
    },
    makeup: {
        width: 16,
        height: 16,
        position: 'absolute',
        borderColor: '#00FF00',
    },
    makeupTL: {
        top: 0,
        left: 0,
        borderTopWidth: BORDER,
        borderLeftWidth: BORDER,
    },
    makeupTR: {
        top: 0,
        right: 0,
        borderTopWidth: BORDER,
        borderRightWidth: BORDER,
    },
    makeupDL: {
        bottom: 0,
        left: 0,
        borderBottomWidth: BORDER,
        borderLeftWidth: BORDER,
    },
    makeupDR: {
        bottom: 0,
        right: 0,
        borderBottomWidth: BORDER,
        borderRightWidth: BORDER,
    },
    info: {
        marginTop: 30,
        fontSize: 15,
        color: '#646566',
    },
});
