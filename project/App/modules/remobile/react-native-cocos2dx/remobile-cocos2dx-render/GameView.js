// 背景 size
var bgSize = null;
// 小人
var person = null;
// 下面黑色的size
var sbSize = null;

var guideTextPic = null;
var npcNormal = null;

// 显示分数的
var ScoreText;
var score;

var gameViewXOffset = 0;
var preBlackXOffset = 0;

var stickObject = null;

var GameLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
    },
});

var getAnimate = function (spriteName, frameCount, duration) {
    var animFrames = [];
    var str = '';
    var frame;
    var cache = cc.spriteFrameCache;
    for (var i = 1; i < frameCount; i++) {
        str = spriteName + i + '.png';
        frame = cache.getSpriteFrame(str);
        animFrames.push(frame);
    }
    var animation = new cc.Animation(animFrames, duration);
    return cc.animate(animation);
};

var personControl = {
    initRes: function (layer) {
        var cache = cc.spriteFrameCache;
        cache.addSpriteFrames(res.plist.main_shake, res.img.main_shake);
        cache.addSpriteFrames(res.plist.main_kick, res.img.main_kick);
        cache.addSpriteFrames(res.plist.main_walk, res.img.main_walk);
        cache.addSpriteFrames(res.plist.main_yao, res.img.main_yao);
        person = new cc.Sprite('#d0001.png');
        var perSize = person.getContentSize();
        person.x = bgSize.width / 2;
        person.y = sbSize.height + perSize.height / 2;
        layer.addChild(person);
    },
    yao: function () {
        var ani = getAnimate('d000', 10, 0.1);
        person.stopAllActions();
        person.runAction(ani.repeatForever());
    },
    walk: function (time) {
        var ani = getAnimate('z000', 10, time);
        person.stopAllActions();
        person.runAction(ani.repeatForever());
    },
    shake: function () {
        var ani = getAnimate('dq000', 10, 0.1);
        person.stopAllActions();
        person.runAction(ani.repeatForever());
    },

};

// 根据不同的value 获取不同的背景图片
var GameViewBackground = cc.Layer.extend({
    ctor: function () {
        this._super();
        bgSize = cc.winSize;
        var num = parseInt(cc.random0To1() * 3);
        var name;
        switch (num) {
            case 0: {
                name = res.img.main_background0;
                break;
            }
            case 1: {
                name = res.img.main_background1;
                break;
            }
            case 2: {
                name = res.img.main_background2;
                break;
            }
            case 3: {
                name = res.img.main_background3;
                break;
            }
            default : {
                name = res.img.main_background0;
                break;
            }
        }
        var bg = new cc.Sprite(name);
        bg.setPosition(bgSize.width / 2, bgSize.height / 2);
        this.addChild(bg, -1);
    },
    scoreBg: function () {
        var bgSize = cc.winSize;
        var scoreBg = new cc.Sprite(res.img.main_score_bg);
        scoreBg.x = bgSize.width / 2;
        scoreBg.y = bgSize.height / 2 + 300;
        this.addChild(scoreBg, 1);

        ScoreText = new cc.LabelTTF('', '宋体', 46);
        ScoreText.setPosition(cc.p(bgSize.width / 2, bgSize.height / 2 + 300));
        ScoreText.setColor(cc.color(255, 255, 255));
        this.addChild(ScoreText, 2);
    },
    drawGuideText: function () {
        guideTextPic = new cc.Sprite(res.img.main_guide_text);
        guideTextPic.setPosition(bgSize.width / 2, bgSize.height / 2 + 220);
        this.addChild(guideTextPic, 2);
        guideTextPic.setVisible(false);
    },
});

var GameView = cc.Layer.extend({
    self: null,
    _start: false,
    ctor: function () {
        this._super();
        var stickBlack = new cc.Sprite(res.img.main_stick_black);
        sbSize = stickBlack.getContentSize();
        stickBlack.setScale(180 / sbSize.width, 387 / sbSize.height);
        stickBlack.x = bgSize.width / 2;
        stickBlack.y = sbSize.height / 2 - 50;
        this.addChild(stickBlack);
        self = this;

        personControl.initRes(this);
        personControl.yao();

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchEnded: this.onTouchEnded,
        }, this);
    },
    startGame: function () {
        score = 0;
        ScoreText.setString(score);

        var _width = 180;
        gameViewXOffset = -_width / 2 + bgSize.width / 2;
        preBlackXOffset = _width;
        this.runAction(cc.sequence(cc.moveBy(0.2, cc.p(-gameViewXOffset, 100))));
        // this.npcRun(0.1);
        personControl.walk(0.1);
        person.runAction(
            cc.sequence(
                cc.moveBy(0.2, cc.p(_width / 2 - 28, 0)),
                cc.callFunc(this.personYao, this),
                cc.callFunc(this.addBlock, this)
            )
        );
        if (guideTextPic != null) {
            guideTextPic.setVisible(true);
        }
    },
    addBlock: function () {
        self._start = true;
        stickObject = new cc.Sprite(res.img.main_stick_black);
        stickObject.setAnchorPoint(cc.p(0.5, 0));

        var stickSize = stickObject.getContentSize();
        stickObject.setPosition(gameViewXOffset + preBlackXOffset - 2.5, sbSize.height);
        stickObject.setScaleY(0);
        this.addChild(stickObject);

        var flag = cc.random0To1() * 120 + 10;
        var stickBlack = new cc.Sprite(res.img.main_stick_black);
        var tSize = stickBlack.getContentSize();
        stickBlack.setScale(flag / sbSize.width, 387 / sbSize.height);
        stickBlack.x = gameViewXOffset + bgSize.width + flag / 2;
        stickBlack.y = -100;
        stickBlack.setAnchorPoint(0.5, 0);
        this.addChild(stickBlack);

        var _offset = bgSize.width - preBlackXOffset;
        // var flag1 = (cc.random0To1()+1)/4;
        var flag1 = (cc.random0To1() + 0.6) / 2;
        currBlackXOffset = flag;
        betweenXOffset = flag1 * _offset;

        stickBlack.runAction(
            cc.sequence(cc.moveBy(0.05, cc.p(-betweenXOffset, 0)))
        );
    },
    personYao: function () {
        personControl.yao();
    },
    onTouchBegan: function (touch, event) {
        cc.log('touch begin');
        if (self._start) {
            self.startSchedule();
            return true;
        }
        return false;
    },
    onTouchEnded: function (touch, event) {
        self.stopSchedule();
    },
    startSchedule: function () {
        self.schedule(this.upDateBlack, 0.02);
        personControl.shake();
    },
    stopSchedule: function () {
        this.unschedule(this.upDateBlack);
        self._start = false;
        stickObject.runAction(
            cc.sequence(
                cc.delayTime(0.3),
                cc.rotateBy(0.1, 90),
                cc.callFunc(this.rotateEnd, this)
            )
        );
    }, upDateBlack: function () {
        var scaleY = stickObject.getScaleY();
        stickObject.setScaleY(scaleY + 0.07);
    }, rotateEnd: function () {
        var uSize = stickObject.getContentSize();
        var finalHeight = stickObject.getScaleY() * uSize.height;
        // 判断是否可以通过,
        var offsetll = (betweenXOffset + preBlackXOffset);
        var result = bgSize.width - offsetll;
        if (result + 5 <= finalHeight && (result + currBlackXOffset >= finalHeight)) {
            // 成功
            cc.log('fuck ok');
            // preBlackXOffset = currBlackXOffset;
            this.next(result + currBlackXOffset);
        } else {
            // 失败
            if (result + currBlackXOffset < finalHeight) {
                this.gameOver(result + currBlackXOffset + 50);
            } else {
                this.gameOver(finalHeight + 30);
            }
        }
    },
    gameOver: function (offset) {
        cc.log('over.....');
        var flag = offset / 500;
        this.npcRun(flag / 30);
        person.runAction(
            cc.sequence(
                cc.moveBy(flag, cc.p(offset, 0)),
                cc.callFunc(this.gameFaile, this)
            )
        );
    },
    npcRun:function (flag) {
        // NPC移动
        personControl.walk(flag);
    },
    nextBlack: function () {
        score++;
        ScoreText.setString(score);
        personControl.yao();

        if (score > cc.sys.localStorage.getItem('best_score')) {
            cc.sys.localStorage.setItem('best_score', score);
        }
        // var u_score = cc.sys.localStorage.getItem("u_score");
        // cc.log("u_score = "+u_score);

        // this.npcYao();
        preBlackXOffset = currBlackXOffset + 40;
        var result = bgSize.width - (betweenXOffset) - 40;
        gameViewXOffset += result;
        this.runAction(
            cc.sequence(
                cc.moveBy(0.3, cc.p(-result, 0)),
                cc.callFunc(this.addBlock, this)
            )
        );
    },
    gameFaile:function () {
        //
        // this.npcYao();
        person.runAction(
            cc.sequence(
                cc.moveTo(0.3, cc.p(person.getPositionX(), -200)),
                cc.callFunc(this.addGameFailView, this)
            )
        );
        stickObject.runAction(
            cc.sequence(cc.rotateBy(0.1, 90))
        );
    },
    addGameFailView:function () {
        // 添加重新开始界面
        var gameOverLayer = new GameOver();
        gameOverLayer.x = gameViewXOffset;
        gameOverLayer.y = -100;
        // gameOverLayer.showScore(Score);
        this.addChild(gameOverLayer);
    },

    next: function (value) {
        cc.log('fuck value is ' + value);
        var flag = value / 500;
        personControl.walk(flag / 30);
        person.runAction(
            cc.sequence(
                cc.moveBy(flag, cc.p(value, 0)),
                cc.callFunc(this.nextBlack, this)
            )
        );
    },

});
