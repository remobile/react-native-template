package com.remobile.utils;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.PowerManager;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.remobile.cordova.CordovaPlugin;

import java.util.HashMap;
import java.util.Map;

public class UtilsModule extends CordovaPlugin {

    public static String FLOG_TAG = "UtilsModule";


    private Activity activity;
    private PowerManager.WakeLock wakeLock;
    private Callback callback;


    public UtilsModule(ReactApplicationContext reactContext, Activity activity) {
        super(reactContext, true);
        this.activity = activity;
    }

    @Override
    public String getName() {
        return "UtilsModule";
    }

    @ReactMethod
    public void lockScreen() {
        PowerManager powerManager = (PowerManager)(activity.getSystemService(Context.POWER_SERVICE));
        wakeLock = powerManager.newWakeLock(PowerManager.SCREEN_BRIGHT_WAKE_LOCK, "My Tag");
        wakeLock.acquire();
    }

    @ReactMethod
    public void unlockScreen() {
        if (wakeLock != null) {
            wakeLock.release();
            wakeLock = null;
        }
    }

    @ReactMethod
    public void startChildApp(String pkg, String cls, String param, Callback callback) {
        try {
            ComponentName componet = new ComponentName(pkg, cls);
            Intent intent = new Intent();
            intent.setComponent(componet);
            intent.setAction("android.intent.action.MAIN");
            intent.putExtra("param", param);
            cordova.startActivityForResult((CordovaPlugin)this, intent, 0);
            this.callback = callback;
        } catch (Exception e) {
            callback.invoke(true);
        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == 0) {
            callback.invoke(false);
        }
    }
}
