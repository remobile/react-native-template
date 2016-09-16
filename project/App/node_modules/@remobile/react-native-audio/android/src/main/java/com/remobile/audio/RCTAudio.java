package com.remobile.audio;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import android.content.res.AssetFileDescriptor;
import android.media.AudioAttributes;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.media.MediaPlayer.OnCompletionListener;
import android.media.MediaPlayer.OnErrorListener;

public class RCTAudio extends ReactContextBaseJavaModule {
  Map<Integer, MediaPlayer> playerPool = new HashMap<>();
  Map<Integer, Integer> loopPool = new HashMap<>();
  ReactApplicationContext context;
  final static Object NULL = null;

  public RCTAudio(ReactApplicationContext context) {
    super(context);
    this.context = context;
  }

  @Override
  public String getName() {
    return "Audio";
  }

  @ReactMethod
  public void prepare(final String fileName, final Integer key, final Callback callback) {
    final MediaPlayer player;
    try {
      if (fileName.startsWith("http://")||fileName.startsWith("https://")||fileName.startsWith("file://")) {
        player = new MediaPlayer();
        player.setAudioStreamType(AudioManager.STREAM_MUSIC);
        player.setDataSource(fileName);
      } else {
        int res = this.context.getResources().getIdentifier(fileName, "raw", this.context.getPackageName());
        AssetFileDescriptor afd = context.getResources().openRawResourceFd(res);
        player = new MediaPlayer();
        player.setDataSource(afd.getFileDescriptor(), afd.getStartOffset(), afd.getLength());
        afd.close();
      }
      player.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
        @Override
        public void onPrepared(MediaPlayer mp) {
          RCTAudio.this.playerPool.put(key, player);
          RCTAudio.this.loopPool.put(key, 0);
          WritableMap props = Arguments.createMap();
          props.putDouble("duration", player.getDuration() * .001);
          callback.invoke(NULL, props);
        }
      });
      player.prepare();
    } catch (IOException e) {
      e.printStackTrace();
      WritableMap res = Arguments.createMap();
      res.putInt("code", -1);
      res.putString("message", "prepare error");
      callback.invoke(res);
      return;
    }
  }

  @ReactMethod
  public void play(final Integer key, final Callback callback) {
    final MediaPlayer player = this.playerPool.get(key);
    if (player == null) {
      callback.invoke(false);
      return;
    }
    if (player.isPlaying()) {
      return;
    }
    player.setOnCompletionListener(new OnCompletionListener() {
      @Override
      public void onCompletion(MediaPlayer mp) {
        Integer loop = RCTAudio.this.loopPool.get(key);
        if (loop == 0) {
          callback.invoke(true);
        } else {
          loop--;
          RCTAudio.this.loopPool.put(key, loop);
          player.start();
        }
      }
    });
    player.setOnErrorListener(new OnErrorListener() {
      @Override
      public boolean onError(MediaPlayer mp, int what, int extra) {
        callback.invoke(false);
        return true;
      }
    });
    player.start();
  }

  @ReactMethod
  public void pause(final Integer key) {
    MediaPlayer player = this.playerPool.get(key);
    if (player != null && player.isPlaying()) {
      player.pause();
    }
  }

  @ReactMethod
  public void stop(final Integer key) {
    MediaPlayer player = this.playerPool.get(key);
    if (player != null && player.isPlaying()) {
      player.stop();
    }
  }

  @ReactMethod
  public void release(final Integer key) {
    MediaPlayer player = this.playerPool.get(key);
    if (player != null) {
      player.release();
      this.playerPool.remove(key);
      this.loopPool.remove(key);
    }
  }

  @ReactMethod
  public void setVolume(final Integer key, final Float left, final Float right) {
    MediaPlayer player = this.playerPool.get(key);
    if (player != null) {
      player.setVolume(left, right);
    }
  }

  @ReactMethod
  public void setNumberOfLoops(final Integer key, final Integer loop) {
    MediaPlayer player = this.playerPool.get(key);
    if (player != null) {
      if (loop < 0) {
        player.setLooping(true);
      } else {
        player.setLooping(false);
        this.loopPool.put(key, loop);
      }
    }
  }

  @ReactMethod
  public void setCurrentTime(final Integer key, final Float sec) {
    MediaPlayer player = this.playerPool.get(key);
    if (player != null) {
      player.seekTo((int)Math.round(sec * 1000));
    }
  }

  @ReactMethod
  public void getCurrentTime(final Integer key, final Callback callback) {
    MediaPlayer player = this.playerPool.get(key);
    if (player == null) {
      callback.invoke(-1, false);
      return;
    }
    callback.invoke(player.getCurrentPosition() * .001, player.isPlaying());
  }
}
