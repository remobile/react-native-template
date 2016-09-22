/**
 * An Image Picker Plugin for React-Native.
 */
package com.remobile.imagePicker;

import java.util.ArrayList;

import android.app.Activity;
import android.content.Intent;

import com.facebook.common.logging.FLog;
import com.remobile.cordova.*;
import com.facebook.react.bridge.*;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


public class RCTImagePicker extends CordovaPlugin {
    public static String LOG_TAG = "ImagePicker";

    private CallbackContext callbackContext;
    private JSONObject params;

    public RCTImagePicker(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() { return "RCTImagePicker"; }

    @ReactMethod
    public void getPictures(ReadableArray args, Callback success, Callback error) {
        executeReactMethod("getPictures", args, success, error);
    }

    @Override
    public boolean execute(String action, final JSONArray args, final CallbackContext callbackContext) throws JSONException {
        this.callbackContext = callbackContext;
        this.params = args.getJSONObject(0);
        if (action.equals("getPictures")) {
            Intent intent = new Intent(this.cordova.getActivity(), MultiImageChooserActivity.class);
            int max = 20;
            int desiredWidth = 0;
            int desiredHeight = 0;
            int quality = 100;
            if (this.params.has("maximumImagesCount")) {
                max = this.params.getInt("maximumImagesCount");
            }
            if (this.params.has("width")) {
                desiredWidth = this.params.getInt("width");
            }
            if (this.params.has("height")) {
                desiredWidth = this.params.getInt("height");
            }
            if (this.params.has("quality")) {
                quality = this.params.getInt("quality");
            }
            intent.putExtra("MAX_IMAGES", max);
            intent.putExtra("WIDTH", desiredWidth);
            intent.putExtra("HEIGHT", desiredHeight);
            intent.putExtra("QUALITY", quality);
            this.cordova.startActivityForResult(this, intent, 0);
        }
        return true;
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == 0) {
            if (this.callbackContext == null) {
                return;
            }
            if (resultCode == Activity.RESULT_OK && data != null) {
                ArrayList<String> fileNames = data.getStringArrayListExtra("MULTIPLEFILENAMES");
                JSONArray res = new JSONArray(fileNames);
                this.callbackContext.success(res);
            } else if (resultCode == Activity.RESULT_CANCELED && data != null) {
                String error = data.getStringExtra("ERRORMESSAGE");
                this.callbackContext.error(error);
            } else if (resultCode == Activity.RESULT_CANCELED) {
                this.callbackContext.error("cancel");
            } else {
                this.callbackContext.error("No images selected");
            }
            this.callbackContext = null;
        }
    }
}