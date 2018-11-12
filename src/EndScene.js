import {StartScene} from "./StartScene"
import {Resources} from "./Resources"


var Layer = cc.Layer.extend({
  sprite:null,
  ctor:function () {
    this._super();
    var size = cc.winSize;
    var helloLabel = new cc.LabelTTF("Game Ended", "Arial", 38);
    helloLabel.x = size.width / 2;
    helloLabel.y = size.height *0.7 ;
    this.addChild(helloLabel, 5);

    const info = "Game programming:\n   Filatov Evgenii"+
    "\nGame resources:\n    opengameart.org";
    var infoLabel = new cc.LabelTTF(info, "Arial", 28);
    infoLabel.setPosition(size.width/2, size.height/2);
    this.addChild(infoLabel, 5);
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
