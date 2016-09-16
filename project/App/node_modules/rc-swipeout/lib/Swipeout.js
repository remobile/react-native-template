'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeSwipeOut = require('react-native-swipe-out');

var _reactNativeSwipeOut2 = _interopRequireDefault(_reactNativeSwipeOut);

var _splitObject3 = require('./util/splitObject');

var _splitObject4 = _interopRequireDefault(_splitObject3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Swipeout = function (_React$Component) {
  (0, _inherits3["default"])(Swipeout, _React$Component);

  function Swipeout(props) {
    (0, _classCallCheck3["default"])(this, Swipeout);

    var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call(this, props));

    _this.state = {
      show: false,
      paddingTop: 0
    };
    return _this;
  }

  Swipeout.prototype.renderCustomButton = function renderCustomButton(button) {
    var buttonStyle = button.style || {};
    var bgColor = buttonStyle.backgroundColor || 'transparent';
    var Component = _react2["default"].createElement(
      _reactNative.View,
      {
        style: {
          flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: bgColor
        }
      },
      _react2["default"].createElement(
        _reactNative.Text,
        { style: [button.style, { textAlign: 'center' }] },
        button.text
      )
    );
    return {
      text: button.text || 'Click',
      onPress: button.onPress,
      type: 'default',
      component: Component,
      backgroundColor: 'transparent',
      color: '#999',
      disabled: false
    };
  };

  Swipeout.prototype.render = function render() {
    var _this2 = this;

    var _splitObject = (0, _splitObject4["default"])(this.props, ['disabled', 'autoClose', 'style', 'left', 'right', 'onOpen', 'children']);

    var _splitObject2 = (0, _slicedToArray3["default"])(_splitObject, 2);

    var _splitObject2$ = _splitObject2[0];
    var disabled = _splitObject2$.disabled;
    var autoClose = _splitObject2$.autoClose;
    var style = _splitObject2$.style;
    var left = _splitObject2$.left;
    var right = _splitObject2$.right;
    var onOpen = _splitObject2$.onOpen;
    var children = _splitObject2$.children;
    var restProps = _splitObject2[1];


    var cutsomLeft = left.map(function (btn) {
      return _this2.renderCustomButton(btn);
    });
    var cutsomRight = right.map(function (btn) {
      return _this2.renderCustomButton(btn);
    });

    return (left.length || right.length) && !disabled ? _react2["default"].createElement(
      _reactNativeSwipeOut2["default"],
      {
        autoClose: autoClose,
        left: cutsomLeft,
        right: cutsomRight,
        style: style,
        onOpen: onOpen
      },
      children
    ) : _react2["default"].createElement(
      _reactNative.View,
      (0, _extends3["default"])({ style: style }, restProps),
      children
    );
  };

  return Swipeout;
}(_react2["default"].Component);

Swipeout.propTypes = {
  prefixCls: _react.PropTypes.string,
  autoClose: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  left: _react.PropTypes.arrayOf(_react.PropTypes.object),
  right: _react.PropTypes.arrayOf(_react.PropTypes.object),
  onOpen: _react.PropTypes.func,
  children: _react.PropTypes.any
};
Swipeout.defaultProps = {
  autoClose: false,
  disabled: false,
  left: [],
  right: [],
  onOpen: function onOpen() {}
};
exports["default"] = Swipeout;
module.exports = exports['default'];