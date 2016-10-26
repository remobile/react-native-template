'use strict';

var React = require('react');
var ReactNative = require('react-native');

var {
    StyleSheet,
    View,
    Text,
    Image,
} = ReactNative;

var MainToast = require('@remobile/react-native-toast');
var SplashScreen = require('@remobile/react-native-splashscreen');
var Button = require('@remobile/react-native-simple-button');
var Capture = require('@remobile/react-native-capture');
var BaiduMap = require('react-native-baidu-map');

var {
    MapView,
    MapTypes,
    MapModule
}  = BaiduMap;


module.exports = React.createClass({
    componentWillMount() {
        this.zoom = 10;
        SplashScreen.hide();
    },
    render() {
        return (
            <View style={styles.container}>
                <MapView
                    childrenPoints={[[330, 50], [580, 200]]}
                    zoom={this.zoom}
                    style={styles.map}
                    onMapClick={(e) => {
                    }}
                    >
                </MapView>
                <View style={styles.row}>
                    <Button onPress={() => {
                            MapModule.setMapType(MapTypes.NORMAL);
                        }} >
                        普通地图
                    </Button>
                    <Button onPress={() => {
                            MapModule.setMapType(MapTypes.SATELLITE);
                        }} >
                        卫星地图
                    </Button>
                </View>
                <Button onPress={() => {
                        MapModule.getCurrentPosition()
                        .then(data => {
                            MainToast.showLongBottom(JSON.stringify(data));
                            MapModule.moveToCenter(data.latitude, data.longitude, 15);
                            MapModule.setMarker(data.latitude, data.longitude);
                            MapModule.reverseGeoCode(data.latitude, data.longitude).then(resp=> {
                                    MainToast.showLongBottom(JSON.stringify(resp));
                            })
                        }).catch(e =>{
                            MainToast.showLongBottom(JSON.stringify(e));
                        })
                        .catch(e =>{
                            console.warn(e)
                        })
                    }}  >
                    定位
                </Button>
                <View style={styles.row}>
                    <Button onPress={() => {
                            this.zoom++;
                            MapModule.setZoom(this.zoom);
                        }}  >
                        放大
                    </Button>
                    <Button onPress={() => {
                            if(this.zoom > 0) {
                                this.zoom--;
                                MapModule.setZoom(this.zoom);
                            }

                        }} >
                        缩小
                    </Button>
                </View>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    btn: {
        height: 48,
        width: 120,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cccccc',
        margin: 4
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    map: {
        width: sr.w,
        height: sr.h - 200,
        marginBottom: 16
    }
});
