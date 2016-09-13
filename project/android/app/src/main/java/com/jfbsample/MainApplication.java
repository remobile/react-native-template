package com.jfbsample;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.remobile.RCTRemobilePackage;
import com.remobile.audio.RCTAudioPackage;
import com.remobile.call.RCTCallPackage;
import com.remobile.camera.RCTCameraPackage;
import com.remobile.contacts.RCTContactsPackage;
import com.remobile.datetimepicker.RCTDateTimePickerPackage;
import com.remobile.des.RCTDesPackage;
import com.remobile.dialogs.RCTDialogsPackage;
import com.remobile.filetransfer.RCTFileTransferPackage;
import com.remobile.imagePicker.RCTImagePickerPackage;
import com.remobile.localNotifications.RCTLocalNotificationsPackage;
import com.remobile.splashscreen.RCTSplashScreenPackage;
import com.remobile.sqlite.RCTSqlitePackage;
import com.remobile.toast.RCTToastPackage;
import com.remobile.update.RCTUpdateMgr;
import com.remobile.video.RCTVideoPackage;
import com.remobile.zip.RCTZipPackage;
import com.rnfs.RNFSPackage;
import com.yoloci.fileupload.FileUploadPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private RCTCameraPackage mCameraPackage;
  private RCTSqlitePackage mSqlitePackage;
  private RCTLocalNotificationsPackage mLocalNotificationPackage;
  private RCTContactsPackage mContactsPackage;
  private RCTUpdateMgr mUpdateMgr;
  private RCTRemobilePackage mRemobile;
  private RCTImagePickerPackage mImagePickerPackage;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected String getJSBundleFile() {
      return mUpdateMgr.getBundleUrl();
    }

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
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
