var GameOver = cc.Layer.extend({
    ctor: function () {
        this._super();

        var size = cc.director.getWinSize();

        var layer = new cc.LayerColor(cc.color(125, 125, 125, 125));
        layer.ignoreAnchor = false;
        layer.anchorX = 0.5;
        layer.anchorY = 0.5;
        layer.setContentSize(size.width, size.height);
        layer.x = size.width / 2;
        layer.y = size.height / 2;
        this.addChild(layer);

        var RestartBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.img.main_restart), // normal state image
            new cc.Sprite(res.img.main_restart), // select state image
            this.onRestart, this);
        var HomeBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.img.main_home), // normal state image
            new cc.Sprite(res.img.main_home), // select state image
            this.onHome, this);

        var ResBtn = new cc.Menu(RestartBtn);  // 7. create the menu
        ResBtn.setPosition(size.width / 2 - 100, size.height / 2 - 100);
        this.addChild(ResBtn);

        var HomBtn = new cc.Menu(HomeBtn);  // 7. create the menu
        HomBtn.setPosition(size.width / 2 + 100, size.height / 2 - 100);
        this.addChild(HomBtn);
        return true;
    }, onRestart: function () {
        this.removeFromParent(true);
        var scene = new cc.Scene();
        var gameViewBackground = new GameViewBackground();
        scene.addChild(gameViewBackground, -1, 0);
        var gameView = new GameView();
        scene.addChild(gameView, -1, 0);

        cc.director.runScene(scene);
        gameViewBackground.scoreBg();
        gameView.startGame();
    },
    onHome: function () {
        if (cc.sendMessage) {
            cc.sendMessage({ type: 'exit' });
        } else {
            this.removeFromParent(true);
            cc.director.runScene(new MenuViewScene());
        }
    },
});
