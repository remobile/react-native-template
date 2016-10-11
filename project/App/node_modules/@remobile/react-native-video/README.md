# React Native Video (remobile)
A video player for react-native, support hls

## Installation
```sh
npm install @remobile/react-native-video --save
```
### Installation (iOS)
* Drag RCTVideo.xcodeproj to your project on Xcode.
* Click on your main project file (the one that represents the .xcodeproj) select Build Phases and drag libRCTVideo.a from the Products folder inside the RCTVideo.xcodeproj.
* Look for Header Search Paths and make sure it contains both $(SRCROOT)/../../../react-native/React as recursive.

### Installation (Android)
```gradle
...
include ':react-native-video'
project(':react-native-video').projectDir = new File(settingsDir, '../node_modules/@remobile/react-native-video/android/RCTVideo')
```

* In `android/app/build.gradle`

```gradle
...
dependencies {
    ...
    compile project(':react-native-video')
}
```

* register module (in MainApplication.java)

```java
......
import com.remobile.video.RCTVideoPackage;  // <--- import

......

@Override
protected List<ReactPackage> getPackages() {
   ......
   new RCTVideoPackage(),            // <------ add here
   ......
}


## Usage
### Example
```js
'use strict';

import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Video from '@remobile/react-native-video';

class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'stretch',
        duration: 0.0,
        currentTime: 0.0,
        paused: false,
    };
    render() {
        return (
            <View style={styles.container}>
                <Video
                    source={{uri: 'http://localhost:3000/test.m3u8'}}
                    style={styles.videoNormalFrame}
                    rate={this.state.rate}
                    paused={this.state.paused}
                    volume={this.state.volume}
                    muted={this.state.muted}
                    resizeMode={this.state.resizeMode}
                    onEnd={() => { AlertIOS.alert('Done!') }}
                    repeat={true}
                    />
            </View>
        );
    }
}
module.exports = VideoPlayer;

var NORMAL_WIDTH = sr.w;
var NORMAL_HEIGHT = NORMAL_WIDTH*2/3;
var FULL_WIDTH = sr.h;
var FULL_HEIGHT = sr.w;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    videoNormalFrame: {
        position: 'absolute',
        top:0,
        left: 0,
        width: NORMAL_WIDTH,
        height: NORMAL_HEIGHT,
    },
});
```

## HELP
* look https://github.com/react-native-community/react-native-video
* this repository add support android hls video


### thanks
* this project come from https://github.com/react-native-community/react-native-video

### see detail use
* https://github.com/remobile/react-native-template
