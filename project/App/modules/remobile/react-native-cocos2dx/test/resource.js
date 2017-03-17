var res = {
     img: {
        main_arrow:'./res/main/arrow.png',
        main_background0:'./res/main/background0.png',
        main_background1:'./res/main/background1.png',
        main_background2:'./res/main/background2.png',
        main_background3:'./res/main/background3.png',
        main_guide_text:'./res/main/guide_text.png',
        main_home:'./res/main/home.png',
        main_kick:'./res/main/kick.png',
        main_notify:'./res/main/notify.png',
        main_over_sore_bg:'./res/main/over_sore_bg.png',
        main_restart:'./res/main/restart.png',
        main_score_bg:'./res/main/score_bg.png',
        main_shake:'./res/main/shake.png',
        main_start_normal:'./res/main/start_normal.png',
        main_start_select:'./res/main/start_select.png',
        main_stick_black:'./res/main/stick_black.png',
        main_walk:'./res/main/walk.png',
        main_yao:'./res/main/yao.png',
    },
     plist: {
        main_kick:'./res/main/kick.plist',
        main_shake:'./res/main/shake.plist',
        main_walk:'./res/main/walk.plist',
        main_yao:'./res/main/yao.plist',
    },
};
var g_resources = [];
for (var i in res.img) {
    g_resources.push(res.img[i]);
}
for (var i in res.plist) {
    g_resources.push(res.plist[i]);
}
