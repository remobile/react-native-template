package com.jfbsample.wxapi;

import com.remobile.wxpay.WeixinPay;
import android.app.Activity;
import android.os.Bundle;
import android.util.Log;

public class WXPayEntryActivity extends Activity {
	
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
		WeixinPay.handleIntent(getIntent());
		Log.v("weixpay-java","onCreate======================================");
		finish();
	}

}
