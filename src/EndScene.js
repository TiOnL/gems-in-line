import {StartScene} from "./StartScene"
import {Resources} from "./Resources"


var Layer = cc.Layer.extend({
  sprite:null,
  ctor:function () {
    this._super();
    var size = cc.winSize;
    var helloLabel = new cc.LabelTTF("END", "Arial", 88);
    helloLabel.x = size.width / 2;
    helloLabel.y = size.height *0.75 ;
    this.addChild(helloLabel, 5);

    const info = "Game programming:\n\n   Filatov Evgenii"+
    "\n\nGame resources:\n\n   opengameart.org \n\n   Filatov Evgenii";
    var infoLabel = new cc.LabelTTF(info, "Arial", 38);
    infoLabel.setPosition(size.width/2, size.height*0.3);
    this.addChild(infoLabel, 5);

    var bgSprite = new cc.Sprite(Resources.res.infoBackground);
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
