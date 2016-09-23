"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

exports["default"] = splitObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function splitObject(obj, parts) {
  var left = {};
  var right = {};
  (0, _keys2["default"])(obj).forEach(function (k) {
    if (parts.indexOf(k) !== -1) {
      left[k] = obj[k];
    } else {
      right[k] = obj[k];
    }
  });
  return [left, right];
}
module.exports = exports['default'];