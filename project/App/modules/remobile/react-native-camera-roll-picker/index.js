var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    Text,
    View,
} = ReactNative;

var CameraRollPicker = require('@remobile/react-native-camera-roll-picker');

module.exports = React.createClass({
    getInitialState() {
        return {
            num: 0,
            selected: [],
        };
    },
    onSelectedImages(images, current) {
        var num = images.length;

        this.setState({
            num: num,
            selected: images,
        });

        console.log(current);
        console.log(this.state.selected);
    },
    openCamera() {
        console.log("open camera here");
    },
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>
                            {this.state.num}
                        </Text>
                        images has been selected
                    </Text>
                </View>
                <CameraRollPicker
                    scrollRenderAheadDistance={500}
                    initialListSize={1}
                    pageSize={3}
                    removeClippedSubviews={false}
                    groupTypes='SavedPhotos'
                    batchSize={5}
                    maximum={1}
                    selected={this.state.selected}
                    assetType='Photos'
                    imagesPerRow={3}
                    imageMargin={5}
                    onSelectedImages={this.onSelectedImages}
                    openCamera={this.openCamera} />
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6AE2D',
    },
    content: {
        marginTop: 15,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    text: {
        fontSize: 16,
        alignItems: 'center',
        color: '#fff',
    },
    bold: {
        fontWeight: 'bold',
    },
    info: {
        fontSize: 12,
    },
});
