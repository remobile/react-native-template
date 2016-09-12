'use strict';

const {SERVER, DOWNLOAD_SERVER} = CONSTANTS;

module.exports = {
    //登录
    ROUTE_REGISTER: SERVER+'register', //注册
    ROUTE_LOGIN: SERVER+'login', //登录
    ROUTE_RETRIEVE_PASSWORD: SERVER+'retrievePassword', //忘记密码
    ROUTE_MODIFY_PASSWORD: SERVER+'modifyPassword', //修改密码

    //个人中心
    ROUTE_GET_PERSONAL_INFO: SERVER+'getPersonalInfo', //获取个人信息
    ROUTE_UPDATE_PERSONAL_INFO: SERVER+'updatePersonalInfo', //修改个人信息
    
    ROUTE_GET_INCOME_SUMMARY: SERVER+'getIncomeSummary', //获取收入汇总
    ROUTE_GET_INCOME_LIST: SERVER+'getIncomeList', //获取收入明细
    ROUTE_GET_WITH_DRAW_LIST: SERVER+'getWithDrawList', //获取提现明细

    //投诉
    ROUTE_ACCUSATIONS: SERVER+'accusations', //我要投诉
    ROUTE_GET_MY_ACCUSATIONS_LIST: SERVER+'getMyAccusationsList', //获取我的投诉列表

    //任务
    ROUTE_GET_TASK_LIST: SERVER+'getTaskList', //获取任务列表
    ROUTE_GET_MY_TASK_LIST: SERVER+'getMyTaskList', //获取我的任务列表
    ROUTE_ACCEPT_TASK: SERVER+'acceptTask', //领取任务
    ROUTE_UPLOAD_MEDIA_FILE: SERVER+'uploadMediaFile', //上传媒体文件
    ROUTE_SUBMIT_TASK: SERVER+'submitTask', //提交任务

    //基础信息
    ROUTE_SUBMIT_FEEDBACK: SERVER+'submitFeedback', //提交信息反馈

    //网页地址
    ROUTE_USER_PROTOCOL: 'http://www.baidu.com', //用户协议
    ROUTE_SOFTWARE_LICENSE: 'http://www.baidu.com',//获取软件许可协议
    ROUTE_ABOUT_PAGE: 'http://www.baidu.com', //关于
};
