import {Stone} from "./Stone";
import {GameLogic} from "./GameLogic"
import {Constants} from "../Constants"
import {DestroyAnimation} from "./DestroyAnimation"
import {AnimatedNumber} from "./AnimatedNumber"

var Layer = cc.Layer.extend({
  sprite:null,
  gameLogic:GameLogic,
  scoreNumber:null,
  stepsNumber:null,
  ctor:function () {
    this._super();
    var size = cc.winSize;
    this.gameLogic = new GameLogic(this);
    this.scoreNumber = new AnimatedNumber(4);
    this.scoreNumber.x = size.width * 0.7;
    this.scoreNumber.y = size.height * 0.9;
    this.scoreNumber.scaleX = 0.6;
    this.addChild(this.scoreNumber);
    this.stepsNumber = new AnimatedNumber(3);
    this.stepsNumber.x = 30;
    this.stepsNumber.y = size.height * 0.9;
    this.addChild(this.stepsNumber);

    this.startLevel();
    cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          onTouchBegan: (touch, event) =>{
              console.log("onTouch");
              this.gameLogic.onClick(touch.getLocation());
          }
        }, this);
    this.scheduleUpdate();
  },

  startLevel(){
    for(var i = 0; i<30; i++){
      var stone = new Stone( Math.floor(Math.random()*3));
      this.gameLogic.addStone(stone, Math.floor(Math.random()*Constants.GAME_FIELD_COLUMN_COUNT));
      this.gameLogic.steps = 5;
    }
  },

  addDestroyAnimation(x,y){
    var sprite = new DestroyAnimation(x,y);
    this.addChild(sprite);
  },

  update(dt){
    this.gameLogic.update(dt);
    this.scoreNumber.setValue(this.gameLogic.score);
    this.stepsNumber.setValue(this.gameLogic.steps);
  }

});

export var GameScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    var layer = new Layer();
    this.addChild(layer);
  }
});
