# React Native Button (remobile)
A simple react-native button

## Installation
```sh
npm install @remobile/react-native-simple-button --save
```

## Usage

### Example
```js
{/*登录按钮*/}
<Button onPress={this.doLogin} style={{position: 'absolute', top: 320, left: 180, }} disable={true}>登录</Button>
{/*忘记密码按钮*/}
<Button onPress={this.doShowForgetPassword} style={{position: 'absolute', right: 5, bottom: 5, }} textStyle={{color:'red'}}>找回密码</Button>
{/*注册按钮*/}
<Button onPress={this.doShowRegister} style={{position: 'absolute', left: 5, bottom: 5, }}>注册</Button>
```

## Screencasts

![demo](https://github.com/remobile/react-native-button/blob/master/screencasts/demo.gif)

#### Props
- `onPress: PropTypes.func`
- `disabled: PropTypes.bool`
- `textStyle: Text.propTypes.style`
- `activeOpacity: PropTypes.number`
