# React Native ImagePicker (remobile)
A image picker for react-native, support for ios and android

## Installation
```sh
npm install @remobile/react-native-image-picker --save
```
### Installation (iOS)
* Drag RCTImagePicker.xcodeproj to your project on Xcode.
* Click on your main project file (the one that represents the .xcodeproj) select Build Phases and drag libRCTImagePicker.a from the Products folder inside the RCTImagePicker.xcodeproj.
* Look for Header Search Paths and make sure it contains both $(SRCROOT)/../../../react-native/React as recursive.

### Installation (Android)
```gradle
...
include ':react-native-image-picker'
project(':react-native-image-picker').projectDir = new File(settingsDir, '../node_modules/@remobile/react-native-image-picker/android/RCTImagePicker')
```

* In `android/app/build.gradle`

```gradle
...
dependencies {
    ...
    compile project(':react-native-image-picker')
}
```

* register module (in MainApplication.java)

```java
......
import com.remobile.imagePicker.RCTImagePickerPackage;  // <--- import

......

@Override
protected List<ReactPackage> getPackages() {
   ......
   new RCTImagePickerPackage(),            // <------ add here
   ......
}

```

### Screencasts
* ios
<br>
![ios](https://github.com/remobile/react-native-image-picker/blob/master/screencasts/ios.gif)
<br>
* android
<br>
![android](https://github.com/remobile/react-native-image-picker/blob/master/screencasts/android.png)

## Usage

### Example
```js
var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
} = ReactNative;

var ImagePicker = require('@remobile/react-native-image-picker');
var Button = require('@remobile/react-native-simple-button');
var Dialogs = require('@remobile/react-native-dialogs');

module.exports = React.createClass({
    onOpen() {
        var options = {maximumImagesCount: 10, width: 400};
        ImagePicker.getPictures(options, function(results) {
            var msg = '';
            for (var i = 0; i < results.length; i++) {
                msg += 'Image URI: ' + results[i] + '\n';
            }
            Dialogs.alert(msg);
        }, function (error) {
            Dialogs.alert('Error: ' + error);
        });
    },
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.onOpen}>Photo</Button>
            </View>
        );
    },
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
});
```

### HELP
* look https://github.com/wymsee/cordova-imagePicker


### thanks
* this project come from https://github.com/wymsee/cordova-imagePicker

### see detail use
* https://github.com/remobile/react-native-template
