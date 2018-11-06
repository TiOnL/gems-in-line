import {Stone} from "./Stone";
import {GameLogic} from "./GameLogic"
import {Constants} from "../Constants"
import {DestroyAnimation} from "./DestroyAnimation"

var Layer = cc.Layer.extend({
  sprite:null,
  gameLogic:GameLogic,
  ctor:function () {
    this._super();
    this.gameLogic = new GameLogic(this);
    this.startLevel();
    cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          onTouchBegan: (touch, event) =>{
              console.log("onTouch");
              this.gameLogic.onClick(touch.getLocation());
          }
        }, this);

  },

  startLevel(){
    for(var i = 0; i<30; i++){
      var stone = new Stone( Math.floor(Math.random()*2));
      this.gameLogic.addStone(stone, Math.floor(Math.random()*Constants.GAME_FIELD_COLUMN_COUNT));
    }
  },

  addDestroyAnimation(x,y){
    var sprite = new DestroyAnimation(x,y);
    this.addChild(sprite);
  }

});

export var GameScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    var layer = new Layer();
    this.addChild(layer);
  }
});
