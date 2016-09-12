package com.jfbsample;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

import com.remobile.RCTRemobilePackage;
import com.remobile.audio.RCTAudioPackage;
import com.remobile.call.RCTCallPackage;
import com.remobile.camera.RCTCameraPackage;
import com.remobile.datetimepicker.RCTDateTimePickerPackage;
import com.remobile.des.RCTDesPackage;
import com.remobile.dialogs.RCTDialogsPackage;
import com.remobile.filetransfer.RCTFileTransferPackage;
import com.remobile.localNotifications.RCTLocalNotificationsPackage;
import com.remobile.splashscreen.RCTSplashScreenPackage;
import com.remobile.sqlite.RCTSqlitePackage;
import com.remobile.toast.RCTToastPackage;
import com.remobile.update.RCTUpdateMgr;
import com.remobile.video.RCTVideoPackage;
import com.remobile.wxpay.WeixinPay;
import com.remobile.zip.RCTZipPackage;
import com.remobile.contacts.RCTContactsPackage;
import com.rnfs.RNFSPackage;
import com.yoloci.fileupload.FileUploadPackage;
import com.remobile.imagePicker.*;

public class MainActivity extends ReactActivity {
    private RCTCameraPackage mCameraPackage;
    private RCTSqlitePackage mSqlitePackage;
    private RCTLocalNotificationsPackage mLocalNotificationPackage;
    private RCTContactsPackage mContactsPackage;
    private RCTUpdateMgr mUpdateMgr;
    private RCTRemobilePackage mRemobile;
    private RCTImagePickerPackage mImagePickerPackage;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "JFBSample";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

   /**
   * A list of packages used by the app. If the app uses additional views
   * or modules besides the default ones, add more packages here.
   */
    @Override
    protected List<ReactPackage> getPackages() {
        mCameraPackage = new RCTCameraPackage(this);
        mSqlitePackage = new RCTSqlitePackage(this);
        mContactsPackage = new RCTContactsPackage(this);
        mLocalNotificationPackage = new RCTLocalNotificationsPackage(this);
        mUpdateMgr = new RCTUpdateMgr(this);
        mRemobile = new RCTRemobilePackage(this);
        mImagePickerPackage = new RCTImagePickerPackage(this);
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new RCTDesPackage(),
                new RCTVideoPackage(),
                new RCTAudioPackage(),
                new RCTSplashScreenPackage(this),
                mRemobile,
                new RCTZipPackage(),
                mCameraPackage,
                mSqlitePackage,
                mLocalNotificationPackage,
                mUpdateMgr.getReactPackage(),
                mContactsPackage,
                mImagePickerPackage,
                new RNFSPackage(),
                new RCTDialogsPackage(this),
                new RCTCallPackage(this),
                new RCTToastPackage(),
                new RCTFileTransferPackage(),
                new FileUploadPackage(),
                new RCTDateTimePickerPackage(this)
        );
    }

    @Override
    protected String getJSBundleFile() {
        return mUpdateMgr.getBundleUrl();
    }

    @Override
    protected void onPause() {
        super.onPause();
        mLocalNotificationPackage.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        mLocalNotificationPackage.onResume();
    }

    @Override
    protected  void onDestroy() {
        super.onDestroy();
        mSqlitePackage.onDestroy();
        mLocalNotificationPackage.onDestroy();
    }

    @Override
    public void onActivityResult(final int requestCode, final int resultCode, final Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        mCameraPackage.onActivityResult(requestCode, resultCode, data);
        mContactsPackage.onActivityResult(requestCode, resultCode, data);
        mRemobile.onActivityResult(requestCode, resultCode, data);
        mImagePickerPackage.onActivityResult(requestCode, resultCode, data);
    }
}
