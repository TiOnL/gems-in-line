import {GameScene} from "./GameScene/GameScene"
import {Resources} from "./Resources"


var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;
        var bgSprite = new cc.Sprite(Resources.res.startScreen);
        bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(bgSprite, -1);
        cc.eventManager.addListener({
                   event: cc.EventListener.KEYBOARD,
                   onKeyPressed: (keyCode, event) =>{
                     if (keyCode == cc.KEY.enter){
                       cc.eventManager.removeAllListeners();
                       cc.director.runScene(new GameScene());
                     }
                   }
                 }, this);
             cc.eventManager.addListener({
                   event: cc.EventListener.TOUCH_ONE_BY_ONE,
                   onTouchBegan: (keyCode, event) =>{
                       cc.eventManager.removeAllListeners();
                       cc.director.runScene(new GameScene());
                   }
                 }, this);
        return true;
    }
});

export var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});
