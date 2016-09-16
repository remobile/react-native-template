'use strict';

//const BASE_SERVER = "http://120.76.207.56:8088/";
const BASE_SERVER = "http://localhost:3000/";

module.exports = {
    //显示发布配置， 发布ios时 ISSUE_IOS=true, ISSUE_ANDROID=false
    //发布android时 ISSUE_IOS=false, ISSUE_ANDROID=true,
    //开发时或者发布小版本时 ISSUE_IOS=false, ISSUE_ANDROID=false
    ISSUE_IOS: false,
    ISSUE_ANDROID: false,
    //测试状态，发布的时候需要改为false
    TEST: true,
    APP_NAME: '疾风步',
    THEME_COLOR: '#2F4F4F',
    //IOS的appid
    // IOS_APPID: '1096525384',
    IOS_APPID: '',
    //web服务器
    DES_KEY:"SV#Y!jAz", //DES加密KEY
    SERVER: BASE_SERVER+"JFBSample/api/", //web服务器地址
    BASE_SERVER: BASE_SERVER, //web服务器地址
    //获取验证码的超时时间
    DEFAULT_CODE_TIMEOUT: 90,
    //分页列表每页数据的条数
    PER_PAGE_COUNT: 10,
    LISTVIEW_INFINITE: {
        STATUS: {
            /*loading more status change graph
            *
            * STATUS_TEXT_HIDE->[STATUS_HAVE_MORE, STATUS_START_LOAD]
            * STATUS_START_LOAD->[STATUS_TEXT_HIDE, STATUS_NO_DATA, STATUS_ALL_LOADED, STATUS_LOAD_ERROR]
            * STATUS_HAVE_MORE->[STATUS_TEXT_HIDE, STATUS_NO_DATA, STATUS_ALL_LOADED, STATUS_LOAD_ERROR]
            * STATUS_ALL_LOADED->[STATUS_TEXT_HIDE]
            */
            STATUS_TEXT_HIDE: 0,
            STATUS_START_LOAD: 1,
            STATUS_HAVE_MORE: 2,
            STATUS_NO_DATA: 3,
            STATUS_ALL_LOADED: 4,
            STATUS_LOAD_ERROR: 5,
        },
        TEXT: {
            0: '',
            1: '',
            2: '正在加载更多...',
            3: '暂无数据!',
            4: '没有更多数据',
            5: '加载错误，请稍后再试',
        },
    },
    TASK_STATES: {
        UNACCEPT: 0,
        TOSUBMIT: 1,
        WAITCHECK: 2,
        COMPLETED: 3,
    },
    LOCAL: false,
};
