function renderCocos2dx() {
    cc.game.onStart = function(){
        cc.view.enableRetina(false);
        // Adjust viewport meta
        cc.view.adjustViewPort(true);
        // Setup the resolution policy and design resolution size
        cc.view.setDesignResolutionSize(375, 667, cc.ResolutionPolicy.SHOW_ALL);
        // The game will be resized when browser size change
        cc.view.resizeWithBrowserSize(true);
        cc.LoaderScene.preload(g_resources, function () {
            cc.director.runScene(new MenuViewScene());
        }, this);
    };
    cc.game.run();
}
