package com.remobile.audioRecorder;

import org.json.JSONArray;
import org.json.JSONException;

import android.media.MediaRecorder;
import android.media.MediaPlayer;
import android.media.AudioManager;
import android.content.Context;

import com.facebook.common.logging.FLog;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.remobile.cordova.*;

import java.util.UUID;
import java.io.FileInputStream;
import java.io.File;
import java.io.IOException;

public class AudioRecorderAPI extends CordovaPlugin {
    private static final String LOG_TAG = "AudioRecorderAPI";
    private MediaRecorder myRecorder = null;
    private MediaPlayer mp = null;
    private String outputFile;

    public AudioRecorderAPI(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AudioRecorder";
    }

    @ReactMethod
    public void record(ReadableArray args, Callback success, Callback error) {
        executeReactMethod("record", args, success, error);
    }

    @ReactMethod
    public void stop(ReadableArray args, Callback success, Callback error) {
        executeReactMethod("stop", args, success, error);
    }

    @ReactMethod
    public void playback(ReadableArray args, Callback success, Callback error) {
        executeReactMethod("playback", args, success, error);
    }

    @ReactMethod
    public void playStop(ReadableArray args, Callback success, Callback error) {
        executeReactMethod("playStop", args, success, error);
    }

    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
        Context context = getReactApplicationContext();

        if (action.equals("record")) {
            outputFile = args.getString(0);
            if (outputFile.length() == 0) {
                outputFile = context.getFilesDir().getAbsoluteFile() + "/" + UUID.randomUUID().toString() + ".m4a";
            }
            record(callbackContext);
            return true;
        }

        if (action.equals("stop")) {
            stopRecord(callbackContext);
            return true;
        }

        if (action.equals("playback")) {
            String filePath = args.getString(0);
            playback(filePath, callbackContext);
            return true;
        }

        if (action.equals("playStop")) {
            playStop();
            return true;
        }

        return false;
    }


    private void record(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                myRecorder = new MediaRecorder();
                myRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
                myRecorder.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4);
                myRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AAC);
                myRecorder.setAudioSamplingRate(44100);
                myRecorder.setAudioChannels(1);
                myRecorder.setAudioEncodingBitRate(32000);
                myRecorder.setOutputFile(outputFile);

                try {
                    myRecorder.prepare();
                    myRecorder.start();
                } catch (final Exception e) {
                    cordova.getThreadPool().execute(new Runnable() {
                        public void run() {
                            callbackContext.error(e.getMessage());
                        }
                    });
                    return;
                }
                callbackContext.success(outputFile);
            }
        });
    }


    private void playback(final String filePath, final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                mp = new MediaPlayer();
                mp.setAudioStreamType(AudioManager.STREAM_MUSIC);
                try {
                    FileInputStream fis = new FileInputStream(new File(filePath));
                    mp.setDataSource(fis.getFD());
                    mp.prepare();
                } catch (IOException e) {
                    e.printStackTrace();
                    final String msg = e.getMessage();
                    cordova.getThreadPool().execute(new Runnable() {
                        public void run() {
                            callbackContext.error(msg);
                        }
                    });
                }
                mp.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
                    public void onCompletion(MediaPlayer m) {
                        mp = null;
                        callbackContext.success("playbackComplete");
                    }
                });
                mp.start();
            }
        });
    }

    private void playStop() {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                if (mp != null && mp.isPlaying()) {
                    mp.stop();
                    mp.release();
                    mp = null;
                }
            }
        });
    }

    private void stopRecord(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                if (myRecorder != null) {
                    myRecorder.stop();
                    myRecorder.release();
                    myRecorder = null;
                }
                callbackContext.success(outputFile);
            }
        });
    }

}
