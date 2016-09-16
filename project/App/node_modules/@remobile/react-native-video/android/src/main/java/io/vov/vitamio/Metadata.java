/*
 * Copyright (C) 2006 The Android Open Source Project
 * Copyright (C) 2013 YIXIA.COM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package io.vov.vitamio;

import android.util.SparseArray;

import java.io.UnsupportedEncodingException;
import java.util.Locale;
import java.util.Map;

/**
 * See {@link io.vov.vitamio.MediaPlayer#getMetadata()}
 */
public class Metadata {
  public static final int ANY = 0;
  public static final int TITLE = 1; // String
  public static final int COMMENT = 2; // String
  public static final int COPYRIGHT = 3; // String
  public static final int ALBUM = 4; // String
  public static final int ARTIST = 5; // String
  public static final int AUTHOR = 6; // String
  public static final int COMPOSER = 7; // String
  public static final int GENRE = 8; // String
  public static final int DATE = 9; // Date
  public static final int DURATION = 10; // Integer(milliseconds)
  public static final int CD_TRACK_NUM = 11; // Integer (1-based)
  public static final int CD_TRACK_MAX = 12; // Integer
  public static final int RATING = 13; // String
  public static final int ALBUM_ART = 14; // byte[]
  public static final int VIDEO_FRAME = 15; // Bitmap
  public static final int LENGTH = 16; // Integer (bytes)
  public static final int BIT_RATE = 17; // Integer
  public static final int AUDIO_BIT_RATE = 18; // Integer
  public static final int VIDEO_BIT_RATE = 19; // Integer
  public static final int AUDIO_SAMPLE_RATE = 20; // Integer
  public static final int VIDEO_FRAME_RATE = 21; // Float
  // See RFC2046 and RFC4281.
  public static final int MIME_TYPE = 22; // String
  public static final int AUDIO_CODEC = 23; // String
  public static final int VIDEO_CODEC = 24; // String
  public static final int VIDEO_HEIGHT = 25; // Integer
  public static final int VIDEO_WIDTH = 26; // Integer
  public static final int NUM_TRACKS = 27; // Integer
  public static final int DRM_CRIPPLED = 28; // Boolean
  public static final int PAUSE_AVAILABLE = 29; // Boolean
  public static final int SEEK_BACKWARD_AVAILABLE = 30; // Boolean
  public static final int SEEK_FORWARD_AVAILABLE = 31; // Boolean
  public static final int SEEK_AVAILABLE = 32; // Boolean
  private static final int LAST_SYSTEM = 32;
  private static final int FIRST_CUSTOM = 8192;
  private SparseArray<byte[]> mMeta = new SparseArray<byte[]>();
  private String mEncoding = "UTF-8";

  public boolean parse(Map<byte[], byte[]> meta, String encoding) {
    String key = null;
    byte[] value = null;
    mEncoding = encoding;
    for (byte[] keyBytes : meta.keySet()) {
      try {
        key = new String(keyBytes, mEncoding).trim().toLowerCase(Locale.US);
      } catch (UnsupportedEncodingException e) {
        key = new String(keyBytes).trim().toLowerCase(Locale.US);
      }
      value = meta.get(keyBytes);
      if (key.equals("title")) {
        mMeta.put(TITLE, value);
      } else if (key.equals("comment")) {
        mMeta.put(COMMENT, value);
      } else if (key.equals("copyright")) {
        mMeta.put(COPYRIGHT, value);
      } else if (key.equals("album")) {
        mMeta.put(ALBUM, value);
      } else if (key.equals("artist")) {
        mMeta.put(ARTIST, value);
      } else if (key.equals("author")) {
        mMeta.put(AUTHOR, value);
      } else if (key.equals("composer")) {
        mMeta.put(COMPOSER, value);
      } else if (key.equals("genre")) {
        mMeta.put(GENRE, value);
      } else if (key.equals("creation_time") || key.equals("date")) {
        mMeta.put(DATE, value);
      } else if (key.equals("duration")) {
        mMeta.put(DURATION, value);
      } else if (key.equals("length")) {
        mMeta.put(LENGTH, value);
      } else if (key.equals("bit_rate")) {
        mMeta.put(BIT_RATE, value);
      } else if (key.equals("audio_bit_rate")) {
        mMeta.put(AUDIO_BIT_RATE, value);
      } else if (key.equals("video_bit_rate")) {
        mMeta.put(VIDEO_BIT_RATE, value);
      } else if (key.equals("audio_sample_rate")) {
        mMeta.put(AUDIO_SAMPLE_RATE, value);
      } else if (key.equals("video_frame_rate")) {
        mMeta.put(VIDEO_FRAME_RATE, value);
      } else if (key.equals("format")) {
        mMeta.put(MIME_TYPE, value);
      } else if (key.equals("audio_codec")) {
        mMeta.put(AUDIO_CODEC, value);
      } else if (key.equals("video_codec")) {
        mMeta.put(VIDEO_CODEC, value);
      } else if (key.equals("video_height")) {
        mMeta.put(VIDEO_HEIGHT, value);
      } else if (key.equals("video_width")) {
        mMeta.put(VIDEO_WIDTH, value);
      } else if (key.equals("num_tracks")) {
        mMeta.put(NUM_TRACKS, value);
      } else if (key.equals("cap_pause")) {
        mMeta.put(PAUSE_AVAILABLE, value);
      } else if (key.equals("cap_seek")) {
        mMeta.put(SEEK_AVAILABLE, value);
      }
    }

    return true;
  }

  public boolean has(final int metadataId) {
    if (!checkMetadataId(metadataId)) {
      throw new IllegalArgumentException("Invalid key: " + metadataId);
    }
    return mMeta.indexOfKey(metadataId) >= 0;
  }

  public String getString(final int key) {
    byte[] value = mMeta.get(key);
    if (value == null) {
      return null;
    }
    try {
      return new String(value, mEncoding);
    } catch (UnsupportedEncodingException e) {
      return new String(value);
    }
  }

  public int getInt(final int key) {
    try {
      return Integer.parseInt(getString(key));
    } catch (Exception e) {
      return -1;
    }
  }

  public boolean getBoolean(final int key) {
    try {
      return Boolean.parseBoolean(getString(key));
    } catch (Exception e) {
      return false;
    }
  }

  public long getLong(final int key) {
    try {
      return Long.parseLong(getString(key));
    } catch (Exception e) {
      return -1;
    }
  }

  public double getDouble(final int key) {
    try {
      return Double.parseDouble(getString(key));
    } catch (Exception e) {
      return -1;
    }
  }

  public byte[] getByteArray(final int key) {
    return mMeta.get(key);
  }

  private boolean checkMetadataId(final int val) {
    if (val <= ANY || (LAST_SYSTEM < val && val < FIRST_CUSTOM)) {
      return false;
    }
    return true;
  }
}
