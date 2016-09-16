package com.remobile;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import com.remobile.alipay.AliPayPlugin;
import com.remobile.audioRecorder.AudioRecorderAPI;
import com.remobile.umeng.UMengSharePlugin;
import com.remobile.utils.UtilsModule;
import com.remobile.wxpay.WeixinPay;

public class RCTRemobilePackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(
                new UMengSharePlugin(reactContext),
                new WeixinPay(reactContext),
                new AliPayPlugin(reactContext),
                new UtilsModule(reactContext),
                new AudioRecorderAPI(reactContext)
        );
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList();
    }
}
