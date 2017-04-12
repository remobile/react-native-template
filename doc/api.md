## 目录
* [1. 登录](#1. 登录)
* [2. 注册](#2. 注册)

---

---


### 1. 登录
- `login`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| phone | string | 登录手机号码 |
| password | string | 登录密码 |


```js
{
    "success": true,
    "context": {
        "userId": "10000"
    }
}
```
| 参数名称 | 参数类型  | 描述 |
|:
| userId | string | 用户Id |

[回到顶部](#目录)

---
### 2. 注册
- `login`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| phone | string | 登录手机号码 |
| email | string | 找回密码的邮箱 |
| password | string | 登录密码 |


```js
{
    "success": true
}
```
[回到顶部](#目录)
