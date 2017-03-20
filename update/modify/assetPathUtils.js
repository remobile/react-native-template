/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';

function getAndroidAssetSuffix(scale) {
  switch (scale) {
    case 0.75: return 'ldpi';
    case 1: return 'mdpi';
    case 1.5: return 'hdpi';
    case 2: return 'xhdpi';
    case 3: return 'xxhdpi';
    case 4: return 'xxxhdpi';
  }
}

function getAndroidDrawableFolderName(asset, scale) {
  var suffix = getAndroidAssetSuffix(scale);
  if (!suffix) {
    throw new Error(
      'Don\'t know which android drawable suffix to use for asset: ' +
      JSON.stringify(asset)
    );
  }
  const isImage = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].indexOf(asset.type) !== -1;
  const isCocos2dxResource =  asset.httpServerLocation.split('/').indexOf('remobile-cocos2dx-resource') !== -1;
  const androidFolder = isImage && !isCocos2dxResource ? 'drawable-' + suffix : 'raw';
  return androidFolder;
}

function getAndroidResourceIdentifier(asset) {
  var folderPath = getBasePath(asset);
  return (folderPath + '/' + asset.name)
    .toLowerCase()
    .replace(/\//g, '_')           // Encode folder structure in file name
    .replace(/([^a-z0-9_])/g, '')  // Remove illegal chars
    .replace(/^assets_/, '');      // Remove "assets_" prefix
}

function getBasePath(asset) {
  var basePath = asset.httpServerLocation;
  if (basePath[0] === '/') {
    basePath = basePath.substr(1);
  }
  return basePath;
}

module.exports = {
  getAndroidAssetSuffix: getAndroidAssetSuffix,
  getAndroidDrawableFolderName: getAndroidDrawableFolderName,
  getAndroidResourceIdentifier: getAndroidResourceIdentifier,
  getBasePath: getBasePath
};
