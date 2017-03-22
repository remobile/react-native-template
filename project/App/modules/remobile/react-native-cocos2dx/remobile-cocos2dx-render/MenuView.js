var menuViewLayer;
var gameView;
var gameViewBackground;

var MenuView = cc.Layer.extend({
    ctor : function () {
        this._super();
        var size = cc.winSize;
        var StartBtn = new cc.MenuItemSprite(
            new cc.Sprite(res.img.main_start_normal), // normal state image
            new cc.Sprite(res.img.main_start_select), // select state image
            this.onPlay, this);
        var Btn = new cc.Menu(StartBtn);  // 7. create the menu
        Btn.setPosition(size.width / 2, size.height / 2);
        this.addChild(Btn);
    },
    onPlay : function () {
        this.removeFromParent(true);
        gameViewBackground.scoreBg(); // 添加score 的背景层
        gameViewBackground.drawGuideText();
        gameView.startGame();
    },
});

var MenuViewScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        gameViewBackground = new GameViewBackground();
        this.addChild(gameViewBackground, -1);

        menuViewLayer = new MenuView();
        this.addChild(menuViewLayer);

        gameView = new GameView();
        this.addChild(gameView, -1);
    },
});
