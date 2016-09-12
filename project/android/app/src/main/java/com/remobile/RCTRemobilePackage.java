package com.remobile;

import android.app.Activity;
import android.content.Intent;

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
    private Activity activity;
    private UMengSharePlugin mUmeng;

    public RCTRemobilePackage(Activity activity) {
        super();
        this.activity = activity;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        mUmeng = new UMengSharePlugin(reactContext, activity);
        return Arrays.<NativeModule>asList(
                mUmeng,
                new WeixinPay(reactContext),
                new AliPayPlugin(reactContext, activity),
                new UtilsModule(reactContext, activity),
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

    public void onActivityResult(final int requestCode, final int resultCode, final Intent data) {
        if (mUmeng != null) {
            mUmeng.onActivityResult(requestCode, resultCode, data);
        }
    }
}
