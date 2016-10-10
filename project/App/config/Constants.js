'use strict';

let CONFIG = {
    //发布时，ISSUE为true，如果发布ios时 ISSUE_IOS=true 其他的发布为 ISSUE_IOS=false
    ISSUE: false,
    ISSUE_IOS: false,
    BASE_SERVER_INDEX: 0, //只有 ISSUE 为 false时生效
};

//web服务器 依次是本地服务器， 测试服务器， 正式服务器
const BASE_SERVERS = ['localhost:3000', '120.76.207.56:8088', 'www.jfbsampe.com'];
const BASE_SERVER = CONFIG.ISSUE ? BASE_SERVERS[2] : BASE_SERVERS[CONFIG.BASE_SERVER_INDEX];

module.exports = {
    APP_NAME: '疾风步',
    THEME_COLORS: ['#2F4F4F', '#A62045', '#239FDB'],
    ISSUE_IOS: CONFIG.ISSUE_IOS,
    TEST: !CONFIG.ISSUE,
    //IOS的appid
    IOS_APPID: '',
    //web服务器
    DES_KEY:"SV#Y!jAz", //DES加密KEY
    SERVER: 'http://'+BASE_SERVER+'/JFBSample/api/', //web服务器地址
    BASE_SERVER: 'http://'+BASE_SERVER+'/',//程序更新下载地址
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
    }
};
