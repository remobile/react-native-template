# React Native Des (remobile)
A des crypto for react-native

## Installation
```sh
npm install @remobile/react-native-des --save
```
### Installation (iOS)
* Drag RCTDes.xcodeproj to your project on Xcode.
* Click on your main project file (the one that represents the .xcodeproj) select Build Phases and drag libRCTDes.a from the Products folder inside the RCTDes.xcodeproj.
* Look for Header Search Paths and make sure it contains both $(SRCROOT)/../../../react-native/React as recursive.

### Installation (Android)
```gradle
...
include ':react-native-des'
project(':react-native-des').projectDir = new File(rootProject.projectDir, '../node_modules/@remobile/react-native-des/android/RCTDes')
```

* In `android/app/build.gradle`

```gradle
...
dependencies {
    ...
    compile project(':react-native-des')
}
```

* register module (in MainActivity.java)

```java
import com.remobile.des.*;  // <--- import

public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {
  ......

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    mReactRootView = new ReactRootView(this);

    mReactInstanceManager = ReactInstanceManager.builder()
      .setApplication(getApplication())
      .setBundleAssetName("index.android.bundle")
      .setJSMainModuleName("index.android")
      .addPackage(new MainReactPackage())
      .addPackage(new RCTDesPackage())              // <------ add here
      .setUseDeveloperSupport(BuildConfig.DEBUG)
      .setInitialLifecycleState(LifecycleState.RESUMED)
      .build();

    mReactRootView.startReactApplication(mReactInstanceManager, "ExampleRN", null);

    setContentView(mReactRootView);
  }

  ......

}
```

## Usage

### Example
```js
var Des = require('@remobile/react-native-des');

Des.encrypt("fangyunjiang is a good developer", "ABCDEFGH", function(base64) {
    console.log(base64); //wWcr2BJdyldTHn4z3AxA0qBIdHQkIKmpqhTgNuRd3fAFXzvIO5347g==
    Des.decrypt(base64, "ABCDEFGH", function(text) {
        console.log(text); //fangyunjiang is a good developer
    }, function(){
        console.log("error");
    });
}, function() {
    console.log("error");
});
```

### method
- `encrypt(text, key, callback)`
- `encrypt(base64, key, callback)`
