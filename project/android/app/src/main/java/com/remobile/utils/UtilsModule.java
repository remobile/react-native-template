package com.remobile.utils;

import android.app.Activity;
import android.content.Context;
import android.os.PowerManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.util.HashMap;
import java.util.Map;

public class UtilsModule extends ReactContextBaseJavaModule {

    public static String FLOG_TAG = "UtilsModule";


    private Activity activity;
    private PowerManager.WakeLock wakeLock;


    public UtilsModule(ReactApplicationContext reactContext, Activity activity) {
        super(reactContext);
        this.activity = activity;
    }

    @Override
    public String getName() {
        return "UtilsModule";
    }

    public Map<String, Object> getConstants() {
        Map<String, Object> constants = new HashMap<>();

        constants.put("statusBarHeight", getStatusBarHeight());

        return constants;
    }


    public int getStatusBarHeight() {
        int result = 0;
        int resourceId = activity.getResources().getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0) {
            result = activity.getResources().getDimensionPixelSize(resourceId);
        }
        return result;
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



}
