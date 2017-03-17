cc.view.enableRetina(false);
cc.view.adjustViewPort(true);
cc.view.setDesignResolutionSize(params.width, params.height, cc.ResolutionPolicy.SHOW_ALL);
cc.view.resizeWithBrowserSize(true);
cc.director.runScene(new MenuViewScene());
