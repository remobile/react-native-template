package com.remobile.wxpay;

import android.content.Intent;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.facebook.common.logging.FLog;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.tencent.mm.sdk.modelbase.BaseReq;
import com.tencent.mm.sdk.modelbase.BaseResp;
import com.tencent.mm.sdk.modelpay.PayReq;
import com.tencent.mm.sdk.modelpay.PayResp;
import com.tencent.mm.sdk.openapi.IWXAPI;
import com.tencent.mm.sdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.sdk.openapi.WXAPIFactory;

import com.remobile.cordova.*;

/**
 * 微信支付插件
 * 
 * @author NCIT
 * 
 */
public class WeixinPay extends CordovaPlugin  implements IWXAPIEventHandler {

	private static WeixinPay gModule = null;
	/** JS回调接口对象 */
	public static CallbackContext cbContext = null;
	
	public static IWXAPI wxAPI;
	private ReactApplicationContext context;

	/** FLog TAG */
	private static final String LOG_TAG = WeixinPay.class.getSimpleName();

	public WeixinPay(ReactApplicationContext reactContext) {
		super(reactContext);
		context = reactContext;
	}

	@Override
	public String getName() { return "WeixinPay"; }

	public static void handleIntent(Intent intent) {
		if (gModule != null) {
			wxAPI.handleIntent(intent, gModule);
		}
	}

	@ReactMethod
	public void payment(ReadableArray args, Callback success, Callback error) {
		String action = "payment";
		try {
			this.execute(action, JsonConvert.reactToJSON(args), new CallbackContext(success, error));
		} catch (Exception ex) {
			FLog.e(LOG_TAG, "Unexpected error:" + ex.getMessage());
		}
	}

	public boolean execute(String action, final JSONArray args, CallbackContext callbackContext) throws JSONException {
		FLog.d(LOG_TAG, "WeixinPay#execute");

		boolean ret = false;

		if ("payment".equalsIgnoreCase(action)) {
			FLog.d(LOG_TAG, "WeixinPay#payment.start");

			cbContext = callbackContext;

			JSONObject jsonObj = args.getJSONObject(0);

			final String appid = jsonObj.getString("appid");
			final String noncestr = jsonObj.getString("noncestr");
			final String packageValue = jsonObj.getString("package");
			final String partnerid = jsonObj.getString("partnerid");
			final String prepayid = jsonObj.getString("prepayid");
			final String timestamp = jsonObj.getString("timestamp");
			final String sign = jsonObj.getString("sign");

			//////////////////////
			// 请求微信支付
			//////////////////////
			wxAPI = WXAPIFactory.createWXAPI(context, appid, true);
			wxAPI.registerApp(appid);
			
			if (!wxAPI.isWXAppInstalled()) {
				FLog.e(LOG_TAG, "Wechat is not installed", new IllegalAccessException());
				ret = false;
	            PluginResult result = new PluginResult(PluginResult.Status.ERROR, "Wechat is not installed");
	            cbContext.sendPluginResult(result);
				return ret;
			}

			FLog.d(LOG_TAG, "WeixinPay#payment.end");

			cordova.getThreadPool().execute(new Runnable() {
				public void run() {
					PayReq payreq = new PayReq();

					payreq.appId = appid;
					payreq.partnerId = partnerid;
					payreq.prepayId = prepayid;
					payreq.packageValue = packageValue;
					payreq.nonceStr = noncestr;
					payreq.timeStamp = timestamp;
					payreq.sign = sign;

					boolean wxret = wxAPI.sendReq(payreq);
					if (!wxret) {
						PluginResult result = new PluginResult(PluginResult.Status.ERROR, "unified order requst failured.");
						cbContext.sendPluginResult(result);
					} else {
						PluginResult result = new PluginResult(PluginResult.Status.OK, "ok");
						cbContext.sendPluginResult(result);
					}
				}
			});
			ret = true;
		}
		Log.v("weixpay-java","execute======================================");
		return ret;
	}

	@Override
	public void initialize() {
		super.initialize();
		gModule = this;
	}

	@Override
	public void onCatalystInstanceDestroy() {
		super.onCatalystInstanceDestroy();
		gModule = null;
	}

	@Override
	public void onReq(BaseReq req) {
	}

	@Override
	public void onResp(BaseResp baseResp) {
		WritableMap map = Arguments.createMap();
		map.putInt("errCode", baseResp.errCode);
		boolean success = false;
		String message = null;
		switch (baseResp.errCode)
		{
			case BaseResp.ErrCode.ERR_OK:
				success = true;
				break;

			case BaseResp.ErrCode.ERR_COMM:
				message = "普通错误类型";
				break;

			case BaseResp.ErrCode.ERR_USER_CANCEL:
				message = "用户点击取消并返回";
				break;

			case BaseResp.ErrCode.ERR_SENT_FAILED:
				message = "发送失败";
				break;

			case BaseResp.ErrCode.ERR_AUTH_DENIED:
				message = "授权失败";
				break;

			case BaseResp.ErrCode.ERR_UNSUPPORT:
				message = "微信不支持";
				break;
		}
		if (success) {
			if (baseResp instanceof PayResp) {
				map.putString("errStr", baseResp.errStr);
				map.putString("success", "true");
			} else {
				map.putString("errStr", "回调不是支付类型");
				map.putString("success", "false");
			}
		} else {
			map.putString("errStr", message);
			map.putString("success", "false");
		}
		Log.v("weixpay-java","onResp======================================"+map+success);
		getReactApplicationContext()
				.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
				.emit("WEIXIN_PAY", map);
	}

}
