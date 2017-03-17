var resolveAssetSource = require('resolveAssetSource');
module.exports = {
     img: {
        main_arrow:resolveAssetSource(require('./res/main/arrow.png')).uri,
        main_background0:resolveAssetSource(require('./res/main/background0.png')).uri,
        main_background1:resolveAssetSource(require('./res/main/background1.png')).uri,
        main_background2:resolveAssetSource(require('./res/main/background2.png')).uri,
        main_background3:resolveAssetSource(require('./res/main/background3.png')).uri,
        main_guide_text:resolveAssetSource(require('./res/main/guide_text.png')).uri,
        main_home:resolveAssetSource(require('./res/main/home.png')).uri,
        main_kick:resolveAssetSource(require('./res/main/kick.png')).uri,
        main_notify:resolveAssetSource(require('./res/main/notify.png')).uri,
        main_over_sore_bg:resolveAssetSource(require('./res/main/over_sore_bg.png')).uri,
        main_restart:resolveAssetSource(require('./res/main/restart.png')).uri,
        main_score_bg:resolveAssetSource(require('./res/main/score_bg.png')).uri,
        main_shake:resolveAssetSource(require('./res/main/shake.png')).uri,
        main_start_normal:resolveAssetSource(require('./res/main/start_normal.png')).uri,
        main_start_select:resolveAssetSource(require('./res/main/start_select.png')).uri,
        main_stick_black:resolveAssetSource(require('./res/main/stick_black.png')).uri,
        main_walk:resolveAssetSource(require('./res/main/walk.png')).uri,
        main_yao:resolveAssetSource(require('./res/main/yao.png')).uri,
    },
     plist: {
        main_kick:resolveAssetSource(require('./res/main/kick.plist')).uri,
        main_shake:resolveAssetSource(require('./res/main/shake.plist')).uri,
        main_walk:resolveAssetSource(require('./res/main/walk.plist')).uri,
        main_yao:resolveAssetSource(require('./res/main/yao.plist')).uri,
    },
};
