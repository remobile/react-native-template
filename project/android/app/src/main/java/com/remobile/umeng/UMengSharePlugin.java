package com.remobile.umeng;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.telecom.Call;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.umeng.socialize.PlatformConfig;
import com.umeng.socialize.ShareAction;
import com.umeng.socialize.UMShareAPI;
import com.umeng.socialize.UMShareListener;
import com.umeng.socialize.bean.SHARE_MEDIA;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class UMengSharePlugin extends ReactContextBaseJavaModule {
    public static String FLOG_TAG = "RCTUmeng";
    private Activity activity;
    private Callback mCallback;

    public UMengSharePlugin(ReactApplicationContext reactContext, Activity activity) {
        super(reactContext);
        this.activity = activity;

        PlatformConfig.setWeixin("wx18d0597c9febcd0d", "83453a0c858e052a3d73dfbdbc11c874");
       PlatformConfig.setQQZone("1105204262", " fELEobxl728L2MDl");
        // PlatformConfig.setQQZone("100424468", "c7394704798a158208a74ab60104f0ba");

        // PlatformConfig.setSinaWeibo("3921700954", "04b48b094faeb16683c32669824ebdad");
//        PlatformConfig.setAlipay("2015111700822536");
    }

    @Override
    public String getName() { return "Umeng"; }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        final Map<String, Object> platforms = new HashMap<>();
        platforms.put("UMShareToSina", SHARE_MEDIA.SINA.toString());// 新浪微博
        platforms.put("UMShareToTencent", SHARE_MEDIA.TENCENT.toString());// 腾讯微博
        platforms.put("UMShareToQzone", SHARE_MEDIA.QZONE.toString());// QQ空间
        platforms.put("UMShareToEmail", SHARE_MEDIA.EMAIL.toString());// 邮箱
        platforms.put("UMShareToSms", SHARE_MEDIA.SMS.toString());// 短信
        platforms.put("UMShareToWechatSession", SHARE_MEDIA.WEIXIN.toString());// 微信好友
        platforms.put("UMShareToWechatTimeline", SHARE_MEDIA.WEIXIN_CIRCLE.toString());// 微信朋友圈
        platforms.put("UMShareToWechatFavorite", SHARE_MEDIA.WEIXIN.toString());// 微信收藏
        platforms.put("UMShareToAlipaySession", SHARE_MEDIA.ALIPAY.toString());// 支付宝好友
        platforms.put("UMShareToQQ", SHARE_MEDIA.QQ.toString());// 手机QQ
        constants.put("platforms", platforms);
        constants.put("isWeixinInstalled", isWeixinAvilible(getReactApplicationContext()));
        constants.put("isQQInstalled", isQQClientAvailable(getReactApplicationContext()));
        return constants;
    }

    public static boolean isWeixinAvilible(Context context) {
        final PackageManager packageManager = context.getPackageManager();// 获取packagemanager
        List<PackageInfo> pinfo = packageManager.getInstalledPackages(0);// 获取所有已安装程序的包信息
        if (pinfo != null) {
            for (int i = 0; i < pinfo.size(); i++) {
                String pn = pinfo.get(i).packageName;
                if (pn.equals("com.tencent.mm")) {
                    return true;
                }
            }
        }

        return false;
    }

    public static boolean isQQClientAvailable(Context context) {
        final PackageManager packageManager = context.getPackageManager();
        List<PackageInfo> pinfo = packageManager.getInstalledPackages(0);
        if (pinfo != null) {
            for (int i = 0; i < pinfo.size(); i++) {
                String pn = pinfo.get(i).packageName;
                if (pn.equals("com.tencent.mobileqq")) {
                    return true;
                }
            }
        }
        return false;
    }

    @ReactMethod
    public void shareWithActionSheet(final ReadableMap args, final Callback callback) {

        final String text = args.getString("text");
        final String title = args.getString("title");
        final String url = args.getString("url");
        mCallback = callback;

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                new ShareAction(activity)
                        .setDisplayList(
//                                SHARE_MEDIA.SINA,
                                // SHARE_MEDIA.TENCENT,
                                SHARE_MEDIA.QZONE,
                                SHARE_MEDIA.EMAIL,
                                SHARE_MEDIA.SMS,
                                SHARE_MEDIA.WEIXIN,
                                SHARE_MEDIA.QQ,
                                SHARE_MEDIA.WEIXIN_CIRCLE
                                )
                        .setCallback(umShareListener)
                        .withText(text)
                        .withTitle(title)
                        .withTargetUrl(url)
                        .open();
            }
        });

    }

    @ReactMethod
    public void shareSingle(final String platfrom, final ReadableMap args, final Callback callback) {

        final String text = args.getString("text");
        final String title = args.getString("title");
        final String url = args.getString("url");
        mCallback = callback;

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {

                new ShareAction(activity)
                        .setPlatform(SHARE_MEDIA.convertToEmun(platfrom))
                        .setCallback(umShareListener)
                        .withText(text)
                        .withTitle(title)
                        .withTargetUrl(url)
                        .share();
            }
        });
    }

    private UMShareListener umShareListener = new UMShareListener() {
        @Override
        public void onResult(SHARE_MEDIA platform) {
            WritableMap params = Arguments.createMap();
            params.putBoolean("success", true);
            mCallback.invoke(params);
        }

        @Override
        public void onError(SHARE_MEDIA platform, Throwable t) {
            WritableMap params = Arguments.createMap();
            params.putBoolean("success", false);
            params.putBoolean("cancel", false);
            mCallback.invoke(params);
        }

        @Override
        public void onCancel(SHARE_MEDIA platform) {
            WritableMap params = Arguments.createMap();
            params.putBoolean("success", false);
            params.putBoolean("cancel", true);
            mCallback.invoke(params);
        }
    };

    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        UMShareAPI.get(activity).onActivityResult(requestCode, resultCode, data);
    }
}
