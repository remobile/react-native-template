'use strict';

//该文件永远不要提交svn
//发布正式服务器的配置，svn上面永远不要动这个配置，在发布测试服务器的时候将ISSUE改为false
//如果发布ios时 ISSUE_IOS=true 其他的发布为 ISSUE_IOS=false
let CONFIG = {
    ISSUE: false,
    ISSUE_IOS: false,
};

//发布测试服务器的配置，该配置只有 CONFIG.ISSUE 为 false 的时候才生效
//如果是本地开发模式， CONFIG.ISSUE = false， TEST_CONFIG.ISSUE = false, 同时可以修改调试的服务器
//如果是发布测试服务器， CONFIG.ISSUE = false，TEST_CONFIG.ISSUE = true
let TEST_CONFIG = {
    ISSUE: false,
    BASE_SERVER_INDEX: 0, //只有 TEST_CONFIG.ISSUE 为 false时生效
};


//web服务器 依次是本地服务器， 测试服务器， 正式服务器
const BASE_SERVERS = ['localhost:3000', '120.76.207.78', 'www.gyyxjqd.com'];
const BASE_SERVER = CONFIG.ISSUE ? BASE_SERVERS[2] : TEST_CONFIG.ISSUE ? BASE_SERVERS[1] : BASE_SERVERS[TEST_CONFIG.BASE_SERVER_INDEX];

module.exports = {
    APP_NAME: '疾风步',
    THEME_COLORS: ['#2F4F4F', '#A62045', '#239FDB'],
    ISSUE_IOS: CONFIG.ISSUE_IOS,
    NOT_NEED_UPDATE_JS_START: !(CONFIG.ISSUE || TEST_CONFIG.ISSUE), //启动时不需要更新小版本
    MINIFY: CONFIG.ISSUE, //是否压缩js文件，我们采取测试服务器为了查找问题不用压缩js文件，正式服务器需要压缩js文件，并且不能看到调试信息
    //IOS的appid
    IOS_APPID: '',
    //web服务器
    DES_KEY:"ABCDEFGH", //DES加密KEY
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
