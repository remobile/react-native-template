import React from 'react'
import {
    View,
    PanResponder,
    Animated,
    Image,
    StyleSheet,
} from 'react-native'

var ClipRect = require('@remobile/react-native-clip-rect');

module.exports = React.createClass({
    getDefaultProps() {
        return {
            editRectWidth: 212,
            editRectHeight: 212,
            editRectRadius: 106,
            overlayColor: 'rgba(0, 0, 0, 0.5)',
        };
    },
    componentWillMount() {
        const {editRectWidth, editRectHeight} = this.props;
        // 上次/当前/动画 x 位移
        this.lastGestureDx = null;
        this.translateX = 0;
        this.animatedTranslateX = new Animated.Value(this.translateX);

        // 上次/当前/动画 y 位移
        this.lastGestureDy = null;
        this.translateY = 0;
        this.animatedTranslateY = new Animated.Value(this.translateY);

        // 缩放大小
        this.scale = 1;
        this.animatedScale = new Animated.Value(this.scale);
        this.lastZoomDistance = null;
        this.currentZoomDistance = 0;

        //图片大小
        this.imageSize =  Math.floor(Math.sqrt(editRectWidth * editRectWidth + editRectHeight * editRectHeight));

        this.imagePanResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderTerminationRequest: (evt, gestureState) => false,

            onPanResponderGrant: (evt, gestureState) => {
                this.lastGestureDx = null;
                this.lastGestureDy = null;
                this.lastZoomDistance = null;
            },
            onPanResponderMove: (evt, gestureState) => {
                const {changedTouches} = evt.nativeEvent;
                if (changedTouches.length <= 1) {
                    this.translateX += (this.lastGestureDx === null) ? 0 : gestureState.dx - this.lastGestureDx;
                    this.translateY += (this.lastGestureDy === null) ? 0 : gestureState.dy - this.lastGestureDy;
                    this.lastGestureDx = gestureState.dx;
                    this.lastGestureDy = gestureState.dy;
                    this.updateTranslate();
                } else {
                    const widthDistance = changedTouches[1].pageX - changedTouches[0].pageX;
                    const heightDistance = changedTouches[1].pageY - changedTouches[0].pageY;
                    this.currentZoomDistance = Math.floor(Math.sqrt(widthDistance * widthDistance + heightDistance * heightDistance));

                    if (this.lastZoomDistance !== null) {
                        let scale = this.scale + (this.currentZoomDistance - this.lastZoomDistance) * this.scale / this.imageSize;
                        if (scale < 1) {
                            scale = 1;
                        }
                        this.animatedScale.setValue(scale);
                        this.updateTranslate();
                        this.scale = scale;
                    }
                    this.lastZoomDistance = this.currentZoomDistance;
                }
            },
            onPanResponderRelease: (evt, gestureState) => {},
            onPanResponderTerminate: (evt, gestureState)=> {}
        })
    },
    updateTranslate() {
        const {editRectWidth, editRectHeight} = this.props;
        const xOffest = (editRectWidth - editRectWidth / this.scale) / 2;
        const yOffest = (editRectHeight - editRectHeight / this.scale) /2;
        if (this.translateX > xOffest) {
            this.translateX = xOffest;
        }
        if (this.translateX < -xOffest) {
            this.translateX = -xOffest;
        }
        if (this.translateY > yOffest) {
            this.translateY = yOffest;
        }
        if (this.translateY < -yOffest) {
            this.translateY = -yOffest;
        }
        this.animatedTranslateX.setValue(this.translateX);
        this.animatedTranslateY.setValue(this.translateY);
    },
    getCropData() {
        const {editRectWidth, editRectHeight, imageWidth, imageHeight} = this.props;
        const ratioX = imageWidth / editRectWidth;
        const ratioY = imageHeight / editRectHeight;
        const width = editRectWidth / this.scale;
        const height = editRectHeight / this.scale;
        const x = editRectWidth / 2 - (width / 2 + this.translateX );
        const y = editRectHeight / 2 - (height  / 2 + this.translateY);
        return {
            offset: {x: x*ratioX, y: y*ratioY},
            size: {width: width*ratioX, height: height*ratioY},
        };
    },
    render() {
        const animatedStyle = {
            transform: [{
                scale: this.animatedScale
            }, {
                translateX: this.animatedTranslateX
            }, {
                translateY: this.animatedTranslateY
            }]
        }
        const {editRectWidth, editRectHeight, editRectRadius, source, style, overlayColor} = this.props;
        return (
            <View style={[styles.container, style]} {...this.imagePanResponder.panHandlers}>
                <Animated.View style={animatedStyle}>
                    <Image style={{width:editRectWidth, height:editRectHeight}} source={source}/>
                </Animated.View>
                <View style={styles.editboxContainer}>
                    <View style={{flex: 1, backgroundColor: overlayColor}} />
                    <View style={styles.editboxMiddle} >
                        <View style={{flex: 1, backgroundColor: overlayColor}} />
                        <View style={{width: editRectWidth, height: editRectHeight}} >
                            <ClipRect style={{width: editRectWidth, height: editRectHeight, borderRadius: editRectRadius, color: overlayColor}} />
                            <View style={[styles.clipRectBoder, {borderRadius: editRectRadius}]} />
                        </View>
                        <View style={{flex: 1, backgroundColor: overlayColor}} />
                    </View>
                    <View style={{flex: 1, backgroundColor: overlayColor}} />
                </View>
            </View>
        )
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'black',
    },
    editboxContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    clipRectBoder: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        borderColor: '#FFFFFF',
        borderWidth: 2,
    },
    editboxMiddle: {
        flexDirection: 'row',
    },
});
