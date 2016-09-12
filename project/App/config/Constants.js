'use strict';

const BASE_SERVER = "http://120.76.207.78/";
// const BASE_SERVER = "http://www.gyyxjqd.com/";

module.exports = {
    //显示发布配置， 发布ios时 ISSUE_IOS=true, ISSUE_ANDROID=false
    //发布android时 ISSUE_IOS=false, ISSUE_ANDROID=true,
    //开发时或者发布小版本时 ISSUE_IOS=false, ISSUE_ANDROID=false
    ISSUE_IOS: false,
    ISSUE_ANDROID: false,
    //测试状态，发布的时候需要改为false
    TEST: true,
    //IOS的appid
    IOS_APPID: '1096525384',
    // IOS_APPID: '',
    //web服务器
    DES_KEY:"SV#Y!jAz", //DES加密KEY
    // SERVER1: BASE_SERVER1+"app/api/", //web服务器地址
    SERVER: BASE_SERVER+"app/api/", //web服务器地址
    DOWNLOAD_SERVER: BASE_SERVER+"download/apks/admin/apks/",//程序更新下载地址
    //获取验证码的超时时间
    DEFAULT_CODE_TIMEOUT: 90,
    //聊天服务器
    CHAT_SERVER_IP:  "120.76.24.185", //聊天服务器IP
    // CHAT_SERVER_IP:  "192.168.1.102", //聊天服务器IP
    CHAT_SERVER_PORT: 52347, //聊天服务器端口
    //服务器超时
    TRAIN_SERVER_TIMEOUT: 30,
    MEETING_SERVER_TIMEOUT: 30,
    //训练场时长
    TRAIN_TYPES: {
        '10001':{gameType: 1, roundTime: 60*1000}, //一分钟自我介绍
        '10002':{gameType: 2, roundTime: 45*1000}, //5秒打电话
    },
    //自定义会场的说话人数
    MAX_MEETING_SPEAKER_NUMBER: 6,
    //自定义会场倒计时变红
    MEET_COUNT_TIME_DOWN: 10*60000,
    //视频播放
    VIDEO_REWARD_RATION: 0.90, //视频播放获取奖励需要时长占总时长的比例
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
            1: '正在加载数据...',
            2: '正在加载更多...',
            3: '暂无数据!',
            4: '没有更多数据',
            5: '加载错误，请稍后再试',
        },
    },
};
