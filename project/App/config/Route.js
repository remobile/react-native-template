'use strict';

const {SERVER, DOWNLOAD_SERVER} = CONSTANTS;

module.exports = {
    //登录
    ROUTE_CHECK_JS_UPDATE: SERVER+"versionUpdate",//检测js更新
    ROUTE_LOGIN: SERVER+"login",//登录
    ROUTE_SEND_VERIFICATION_CODE: SERVER+"sendVerificationCode",//发送验证码
    ROUTE_REGISTER: SERVER+"register",//注册
    ROUTE_FIND_PWD: SERVER+"findPwd",//忘记密码确认
    ROUTE_UP_DATEPWD: SERVER+"updatePwd",//忘记密码提交更新
    //首页
    ROUTE_GET_HOME_PAGE_DATA: SERVER+"getHomePageData",//拉取首页数据
    ROUTE_DO_LIKE: SERVER+"doLike",//点赞
    ROUTE_DO_COLLECTION: SERVER+"doCollection",//收藏
    ROUTE_DO_SHARE: SERVER+"doShare",//分享
    ROUTE_GET_SEARCH_DATA: SERVER+"getSearchData",//进入搜索页面拉取搜索数据
    ROUTE_SEARCH: SERVER+"search",//首页搜索视频
    //个人中心
    ROUTE_SUBMIT_GETMYTASKRECORD: SERVER+"getMyTaskRecord",//获取我的任务记录
    ROUTE_SUBMIT_GETMYPROFIT: SERVER+"getMyProfit",//获取我的收益
    ROUTE_SUBMIT_GETMYNEWS: SERVER+"getNews",//获取消息
    ROUTE_SUBMIT_DELNEWS: SERVER+"delNews",//删除消息
    ROUTE_SUBMIT_GETMYCOLLECTION: SERVER+"getMyCollection",//获取收藏
    ROUTE_SUBMIT_DELETEMYCOLLECTION: SERVER+"delMyCollectVedio",//删除收藏
    ROUTE_GET_PERSONAL_INFO: SERVER+"getPersonalInfo",//获取个人信息
    ROUTE_UPDATE_FILE: SERVER+"uploadFile",//上传文件
    ROUTE_UPDATE_MULTI_FILES: SERVER+"uploadFiles",//上传多个文件
    ROUTE_UPDATE_PERSONAL_INFO: SERVER+"updatePersnalInfo",//更新个人信息
    ROUTE_SUBMIT_GETMYLEARNINGRECORD: SERVER+"getMyLearningRecord",//获取学习记录
    ROUTE_SUBMIT_DELMYLEARNINGRECORD: SERVER+"delMyLearningRecord",//删除学习记录
    ROUTE_SUBMIT_FEEDBACK: SERVER+"submitFeedback",//提交信息反馈
    ROUTE_CHANGE_MESSAGE_STATE: SERVER+"changeMyNewsState",//修改信息阅读状态
    //学习场
    ROUTE_GET_PRIZES: SERVER+"getPrizes",//点击抽奖接口
    ROUTE_GET_VIDEO_LIST: SERVER+"getVideoList",//获取学习场视频列表
    ROUTE_SEARCH_VIDEO: SERVER+"searchVideo",//学习场搜索视频
    ROUTE_GET_REWARD_LIST: SERVER+"getRewardList",//跳转到抽奖接口
    ROUTE_MY_AWARD_RECORDS: SERVER+"myAwardRecords",//我的获奖记录
    ROUTE_SUBMIT_RECEIVEING_INFO: SERVER+"submitReceivingInfo",//获奖后提交个人信息
    ROUTE_GET_INTEGRAL_GOODS: SERVER+"getIntegralGoods",//拉取积分兑换数据
    ROUTE_EXCHANGE: SERVER+"exchange",//积分兑换
    ROUTE_RELEVANT_VIDEO: SERVER+"relevantVideo",//推荐案例、相关视频
    ROUTE_GET_WIN_COIN_GOODS: SERVER+"getWinCoinGoods",//拉取赢销币购买列表
    ROUTE_CREATE_WIN_CONIN_ORDER: SERVER+"createWinCoinOrder",//赢销币购买--生成订单
    ROUTE_GET_COMMENT: SERVER+"getComment",//获取评论
    ROUTE_WATCH_VIDEO: SERVER+"watchVideo",//看完一个视频 获得积分
    ROUTE_SUBMIT_SON_COMMENT: SERVER+"submitSonComment",//提交评论的回复
    ROUTE_GET_SON_COMMENT: SERVER+"getSonComment",//获取评论的回复
    ROUTE_SUBMIT_COMMENT: SERVER+"submitComment",//提交评论
    ROUTE_GET_TASK_INTEGRATION: SERVER+"getTaskIntegration",//获取各任务以及相应的积分
    ROUTE_UPDATECLICKS: SERVER+"updateClicks",//添加视频的点击量（在点击播放的时候执行该接口）
    ROUTE_GET_VIDEO_INFO_BYID: SERVER+"getVideoInfoById",//点击播放视频页面获取视频信息
    ROUTE_CHECK_ALIPAY_ISSUCCESS: SERVER+"checkAlipayIsSuccess",//验证支付宝支付是否成功
    //训练场
    ROUTE_GET_TRAINING_INFO: SERVER+"getTrainingInfo",//获取所有训练项目信息
    ROUTE_SEND_MESSAGE: SERVER+"sendMessage",//训练场中：发送信息
    ROUTE_UPDATE_MESSAGE: SERVER+"updateMessage",//训练场中：刷新交流信息
    ROUTE_SEND_PROP: SERVER+"sendProp",//训练场中：送道具
    ROUTE_SUBMIT_SCORE: SERVER+"submitScore",//提交打分信息
    ROUTE_GET_VIRTUAL_INFO: SERVER+"getVirtualInfo",//自我训练场获取虚拟人物和虚拟评论
    ROUTE_GET_ALIPAY_INFO: SERVER+"getaliPayInfo",//前端获取支付宝认证信息
    ROUTE_GET_WXPAY_INFO: SERVER+"perpay",//前端获取微信支付信息
    //自定义训练场
    ROUTE_APPLY_ROOM: SERVER+"applyRoom",//自定义场房间申请
    ROUTE_GET_ROOM_LIST: SERVER+"getCustomRoomList",//获取自定义房间列表
    ROUTE_SUBMIT_ONLINE_PERSON: SERVER+"onLinePeopleNum",//提交房间在线人数
    ROUTE_SUBMIT_DELETE_ROOM: SERVER+"delRoom",//删除房间
    ROUTE_GET_MY_ROOM_LIST: SERVER+"getCustomRoomListByUserId",//删除房间
    //网页地址
    ROUTE_USER_PROTOCOL: SERVER+"protocolJsp",//用户协议
    ROUTE_SOFTWARE_LICENSE: SERVER+"agreementJsp",//获取软件许可协议
    ROUTE_ABOUT_PAGE: SERVER+"aboutJsp", //关于
    ROUTE_GAME_RULE_PAGE: SERVER+"checkoutRulesJsp", //游戏规则
    //下载更新
    ROUTE_VERSION_INFO_URL: DOWNLOAD_SERVER+"json/version.json",//版本信息地址
    ROUTE_JS_ANDROID_URL: DOWNLOAD_SERVER+"jsAndroid/jsandroid.zip",//android jsbundle 包地址
    ROUTE_JS_IOS_URL: DOWNLOAD_SERVER+"jsIos/jsios.zip",//ios jsbundle 包地址
    ROUTE_APK_URL: DOWNLOAD_SERVER+"apk/jfbsample.apk", //apk地址
    //商场
    ROUTE_GET_GOODS_INFO: SERVER+"getGoodsInfo", //获取商城首页数据
    ROUTE_SEARCH_GOODS: SERVER+"searchGoods", //商城首页搜索
    ROUTE_GET_GOODS_DETAIL: SERVER+"getGoodsDetail", //获取商品详情
    ROUTE_GET_SHOP_INFO: SERVER+"getshopInfo", //获取商家信息
    ROUTE_GET_GOODS_COMMENT: SERVER+"getGoodsComment", //获取商品评论
    ROUTE_MERCHANDISING: SERVER+"merchandising", //购买商品/选择商品
    ROUTE_PLACE_ORDER: SERVER+"placeOrder", //下订单
    ROUTE_ORDER_DATA: SERVER+"orderData", //下订单页面获取数据
    ROUTE_GET_MY_ADDR: SERVER+"getMyAddr", //获取个人地址信息
    ROUTE_SUBMIT_MY_ADDR: SERVER+"submitMyAddr", //提交个人地址信息
    ROUTE_GET_MY_ORDER: SERVER+"getMyOrder", //获取我的订单信息
    ROUTE_GET_ORDER_DETAIL: SERVER+"getOrderDetail", //获取订单详情
    ROUTE_DEL_ORDER: SERVER+"delOrder", //删除订单
    ROUTE_SUBMIT_GOODS_COMMENT: SERVER+"submitGoodsComment", //提交评论
    ROUTE_END_ORDER: SERVER+"endOrder", //确认收货
    ROUTE_ALIPAY_CONFIRM: SERVER+"aliPayConfirm", //阿里支付确认
    ROUTE_WECHATPAY_CONFIRM: SERVER+"wechatPayConfirm", //微信支付确认
    //实战场
    ROUTE_GET_KITS: SERVER+"getKits", //实战场获取需求数据
    ROUTE_GET_CASE: SERVER+"getCase", //实战场获取案例数据
    ROUTE_GET_ITEM_KIT: SERVER+"getItemKit", //获取item急救包详情
    ROUTE_GET_ITEM_KIT_COMMENT: SERVER+"getItemKitComment", //获取item急救包评论
    ROUTE_REPLAY_ITEM_KIT: SERVER+"replayItemKit", //回复item急救包评论
    ROUTE_GET_SONKIDS_COMMENT: SERVER+"getSonKidsComment", //获取评论的回复
    ROUTE_SUBMIT_SONKIDS_COMMENT: SERVER+"submitSonKidsComment", //提交评论的回复
    ROUTE_CASE_SCHEME: SERVER+"getCaseScheme", //对每个case获取网友方案
    ROUTE_PARISE_KITS: SERVER+"praiseKits", //急救包点赞
    ROUTE_GET_SCORE_DETAIL: SERVER+"getScoreDetail", //实战场获取分数详情
    ROUTE_SUBMIT_SCHEME_SCORE: SERVER+"submitSchemeScore",//提交打分信息
    ROUTE_GET_CASE_SCHEME_DETAIL: SERVER+"getCaseSchemeDetail", //方案详情
    ROUTE_SUBMIT_KIT: SERVER+"submitKit", //报名提交方案
    ROUTE_PUBLISHER_KID: SERVER+"publisherKid", //发布急救包
    ROUTE_MY_KID: SERVER+"myKid", //我的急救包

};
