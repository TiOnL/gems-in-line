import {StartScene} from "./StartScene"
import {Resources} from "./Resources"


var Layer = cc.Layer.extend({
  ctor:function () {
    this._super();
    var size = cc.winSize;
    var bgSprite = new cc.Sprite(Resources.res.endScreen);
    bgSprite.attr({
        x: size.width / 2,
        y: size.height / 2
    });
    this.addChild(bgSprite);

    cc.eventManager.addListener({
      event: cc.EventListener.KEYBOARD,
      onKeyPressed: (keyCode, event) =>{
        if (keyCode == cc.KEY.enter){
          cc.eventManager.removeAllListeners();
          cc.director.runScene(new StartScene());
        }
      }
    }, this);
    cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      onTouchBegan: (keyCode, event) =>{
        cc.eventManager.removeAllListeners();
        cc.director.runScene(new StartScene());
      }
    }, this);
    return true;
  }
});

export var EndScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    var layer = new Layer();
    this.addChild(layer);
  }
});
