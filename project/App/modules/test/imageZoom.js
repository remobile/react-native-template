import React from 'react'
import {
    View,
    PanResponder,
    Animated,
    Image,
    StyleSheet,
} from 'react-native'

var {ClipRect} = COMPONENTS;

module.exports = React.createClass({
    getDefaultProps() {
        return {
            imageWidth: 212,
            imageHeight: 212,
            editRectWidth: 212,
            editRectHeight: 212,
            editRectRadius: 106,
        };
    },
    componentWillMount() {
        const {imageWidth, imageHeight, editRectWidth, editRectHeight} = this.props;
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
        this.imageSize =  Math.floor(Math.sqrt(imageWidth * imageWidth + imageHeight * imageHeight));

        //最小缩放比例饿
        this.minScale = Math.min(editRectWidth/imageWidth, editRectHeight/imageHeight);

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
                        let scale = this.scale + (this.currentZoomDistance - this.lastZoomDistance)*this.scale / this.imageSize;
                        if (scale < this.minScale) {
                            scale = this.minScale;
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
        const {imageWidth, imageHeight, editRectWidth, editRectHeight} = this.props;
        const xOffest = (editRectWidth - imageWidth / this.scale) / 2;
        const yOffest = (editRectHeight - imageHeight / this.scale) /2;
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
        console.log("=============", this.translateX, this.translateY);
        this.animatedTranslateX.setValue(this.translateX);
        this.animatedTranslateY.setValue(this.translateY);
    },
    getCropData() {
        const {imageWidth, imageHeight, editRectWidth, editRectHeight} = this.props;
        const x = imageWidth  / 2 - (editRectWidth / 2 + this.translateX / this.scale);
        const y = imageHeight / 2 - (editRectHeight  / 2 + this.translateY / this.scale);
        console.log("=========", this.scale, imageWidth, this.translateX, this.translateY);
        // return {
        //     offset: {x, y},
        //     size: {width: editRectWidth, height: editRectHeight},
        // };
        return {x, y, width: editRectWidth, height: editRectHeight}
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
        const {imageWidth, imageHeight, editRectWidth, editRectHeight, editRectRadius, source, style} = this.props;
        return (
            <View style={[styles.container, style]} {...this.imagePanResponder.panHandlers}>
                <Animated.View style={animatedStyle}>
                    <Image style={{width:imageWidth, height:imageHeight}} source={source}/>
                </Animated.View>
                <View style={styles.editboxContainer}>
                    <View style={styles.editboxTop} />
                    <View style={styles.editboxMiddle} >
                        <View style={styles.editboxMiddleLeft} />
                        <View style={{width: editRectWidth, height: editRectHeight}} >
                            <ClipRect style={[styles.clipRect, {width: editRectWidth, height: editRectHeight, borderRadius: editRectRadius}]} />
                            <View style={[styles.clipRectBoder, {borderRadius: editRectRadius}]} />
                        </View>
                        <View style={styles.editboxMiddleRight} />
                    </View>
                    <View style={styles.editboxBottom} />
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
    clipRect: {
        color: 'rgba(0, 0, 0, 0.5)',
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
    editboxTop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    editboxMiddle: {
        flexDirection: 'row',
    },
    editboxMiddleLeft: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    editboxMiddleRight: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    editboxBottom: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
