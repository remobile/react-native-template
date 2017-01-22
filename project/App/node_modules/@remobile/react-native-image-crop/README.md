# React Native Image Crop (remobile)
A component for react-native crop image,  such as edit user head.

## Installation
```sh
npm install @remobile/react-native-image-crop --save
```

## Usage

### Example
```js
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    Image,
    ImageEditor,
} = ReactNative;

var Button = require('@remobile/react-native-simple-button');
var ImageCrop = require('@remobile/react-native-image-crop');

module.exports = React.createClass({
    getInitialState() {
        return {
            croppedImageURI: '',
        };
    },
    edit() {
        const cropData = this.imageCrop.getCropData();
        ImageEditor.cropImage(
            'http://v1.qzone.cc/avatar/201407/07/00/24/53b9782c444ca987.jpg!200x200.jpg',
            cropData,
            (croppedImageURI) => {
                this.setState({croppedImageURI})
            },
            (error) => console.log(error)
        );
    },
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.edit}>编辑</Button>
                <ImageCrop
                    imageWidth={200}
                    imageHeight={200}
                    ref={(ref)=>this.imageCrop = ref}
                    source={{uri:'http://v1.qzone.cc/avatar/201407/07/00/24/53b9782c444ca987.jpg!200x200.jpg'}} />
                <View style={styles.imageContainer}>
                    <Image
                        source={{uri: this.state.croppedImageURI}}
                        style={styles.image}
                        />
                </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        height: 200,
        marginTop: 20,
        backgroundColor: 'white',
    },
    image: {
        marginLeft: sr.w/2-100,
        width: 200,
        height: 200,
    },
});
```

## Screencasts

![crop1](https://github.com/remobile/react-native-button/blob/master/screencasts/crop1.gif)
![crop2](https://github.com/remobile/react-native-button/blob/master/screencasts/crop2.gif)
![crop3](https://github.com/remobile/react-native-button/blob/master/screencasts/crop3.gif)

#### Props
- `imageWidth: PropTypes.number.required`  //must be image real origin imageWidth
- `imageHeight: PropTypes.number.required` //must be image real origin imageHeight
- `editRectWidth: PropTypes.number.optional` //default: 212 [the edit rect width]
- `editRectHeight: PropTypes.number.optional` //default: 212 [the edit rect height]
- `editRectRadius: PropTypes.number.optional` //default: 106, the rect is round
- `overlayColor: PropTypes.string.optional` //default: rgba(0, 0, 0, 0.5)
#### Functions
- `getCropData()` //return ImageEditor.cropImage's cropData widthout displaySize
