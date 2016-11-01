'use strict';

const {SERVER, BASE_SERVER} = CONSTANTS;

module.exports = {
    //登录
    ROUTE_REGISTER: SERVER+'register', //注册
    ROUTE_LOGIN: SERVER+'login', //登录
    ROUTE_RETRIEVE_PASSWORD: SERVER+'retrievePassword', //忘记密码
    ROUTE_MODIFY_PASSWORD: SERVER+'modifyPassword', //修改密码

    //个人中心
    ROUTE_GET_PERSONAL_INFO: SERVER+'getPersonalInfo', //获取个人信息
    ROUTE_UPDATE_PERSONAL_INFO: SERVER+'updatePersonalInfo', //修改个人信息
    ROUTE_SUBMIT_FEEDBACK: SERVER+'submitFeedback', //提交信息反馈

    //个人中心
    ROUTE_GET_MESSAGE_LIST: SERVER+'getMessageList', //拉取聊天列表

    //网页地址
    ROUTE_USER_PROTOCOL: BASE_SERVER+'helper/protocal.html', //用户协议
    ROUTE_SOFTWARE_LICENSE: BASE_SERVER+'helper/protocal.html',//获取软件许可协议
    ROUTE_ABOUT_PAGE: BASE_SERVER+'helper/about.html', //关于

    //下载更新
    ROUTE_VERSION_INFO_URL: BASE_SERVER+"download/version.json",//版本信息地址
    ROUTE_JS_ANDROID_URL: BASE_SERVER+"download/jsandroid.zip",//android jsbundle 包地址
    ROUTE_JS_IOS_URL: BASE_SERVER+"download/jsios.zip",//ios jsbundle 包地址
    ROUTE_APK_URL: BASE_SERVER+"download/yxjqd.apk", //apk地址
};
