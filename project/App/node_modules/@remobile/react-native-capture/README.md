# React Native Capture (remobile)
A cordova capture for react-native, support for ios and android

## Installation
```sh
npm install @remobile/react-native-capture --save
```
### Installation (iOS)
* Drag RCTCapture.xcodeproj to your project on Xcode.
* Click on your main project file (the one that represents the .xcodeproj) select Build Phases and drag libRCTCapture.a from the Products folder inside the RCTCapture.xcodeproj.
* Look for Header Search Paths and make sure it contains both $(SRCROOT)/../../../react-native/React as recursive.

### Installation (Android)
```gradle
...
include ':react-native-capture'
project(':react-native-capture').projectDir = new File(settingsDir, '../node_modules/@remobile/react-native-capture/android')
```

* In `android/app/build.gradle`

```gradle
...
dependencies {
    ...
    compile project(':react-native-capture')
}
```

* register module (in MainApplication.java)

```java
......
import com.remobile.capture.RCTCapturePackage;  // <--- import

......

@Override
protected List<ReactPackage> getPackages() {
   ......
   new RCTCapturePackage(),            // <------ add here
   ......
}

```

## Usage

### Example
```js
var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Image
} = ReactNative;

var Capture = require('@remobile/react-native-capture');
var Button = require('@remobile/react-native-simple-button');

module.exports = React.createClass({
    getInitialState () {
        return {
            filePath: '',
        };
    },
    taskVideo() {
        Capture.captureVideo((mediaFiles)=>{
            let filePath = mediaFiles[0].fullPath;
            this.setState({filePath});
        }, ()=>{
            Toast('录制失败');
        }, {limit:1});
    },
    render() {
        const {filePath} = this.state;
        return (
            <View style={styles.container}>
                <Button onPress={this.taskVideo}>摄像</Button>
                <Text>{filePath}</Text>
            </View>
        );
    },
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
});
```

### HELP
* look https://github.com/apache/cordova-plugin-media-capture


### thanks
* this project come from https://github.com/apache/cordova-plugin-media-capture

### see detail use
* https://github.com/remobile/react-native-template
