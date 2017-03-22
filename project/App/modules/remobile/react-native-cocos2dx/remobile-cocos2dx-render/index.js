var g_resources = [];
for (var i in res.img) {
    g_resources.push(res.img[i]);
}
for (var j in res.plist) {
    g_resources.push(res.plist[j]);
}

cc.view.enableRetina(false);
cc.view.adjustViewPort(true);
cc.view.setDesignResolutionSize(params.width, params.height, cc.ResolutionPolicy.SHOW_ALL);
cc.view.resizeWithBrowserSize(true);
cc.LoaderScene.preload(g_resources, function () {
    cc.director.runScene(new MenuViewScene());
}, window);
