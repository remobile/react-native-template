package com.jfbsample;

import android.app.Application;

import com.eguma.barcodescanner.BarcodeScanner;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.github.alinz.reactnativewebviewbridge.WebViewBridgePackage;
import com.remobile.RCTRemobilePackage;
import com.remobile.batteryStatus.RCTBatteryStatusPackage;
import com.remobile.camera.RCTCameraPackage;
import com.remobile.capture.RCTCapturePackage;
import com.remobile.contacts.RCTContactsPackage;
import com.remobile.des.RCTDesPackage;
import com.remobile.dialogs.RCTDialogsPackage;
import com.remobile.filetransfer.RCTFileTransferPackage;
import com.remobile.imagePicker.RCTImagePickerPackage;
import com.remobile.localNotifications.RCTLocalNotificationsPackage;
import com.remobile.marqueeLabel.RCTMarqueeLabelPackage;
import com.remobile.module.RCTModulePackage;
import com.remobile.qrcodeLocalImage.RCTQRCodeLocalImagePackage;
import com.remobile.splashscreen.RCTSplashScreenPackage;
import com.remobile.sqlite.RCTSqlitePackage;
import com.remobile.toast.RCTToastPackage;
import com.remobile.update.RCTUpdateMgr;
import com.remobile.video.RCTVideoPackage;
import com.remobile.zip.RCTZipPackage;
import com.rnfs.RNFSPackage;

import java.util.Arrays;
import java.util.List;


public class MainApplication extends Application implements ReactApplication {
    private RCTUpdateMgr mUpdateMgr;

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected String getJSBundleFile() {
            return mUpdateMgr.getBundleUrl();
        }

        @Override
        protected List<ReactPackage> getPackages() {
            mUpdateMgr = new RCTUpdateMgr(MainActivity.activity);

            return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new RCTRemobilePackage(MainActivity.activity),
                //RemobileLibraries
                new RCTSplashScreenPackage(MainActivity.activity),
                new RCTToastPackage(),
                new RCTDialogsPackage(),
                new RCTLocalNotificationsPackage(),
                new RCTZipPackage(),
                new RCTSqlitePackage(),
                new RCTDesPackage(),
                mUpdateMgr.getReactPackage(),
                new RCTContactsPackage(),
                new RCTCameraPackage(),
                new RCTCapturePackage(),
                new RCTImagePickerPackage(),
                new RCTVideoPackage(),
                new RCTFileTransferPackage(),
                new RCTQRCodeLocalImagePackage(),
                new RCTMarqueeLabelPackage(),
                new RCTBatteryStatusPackage(),
                new RCTModulePackage(),
                //VendorLibraries
                new RNFSPackage(),
                new BarcodeScanner(),
                new WebViewBridgePackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
