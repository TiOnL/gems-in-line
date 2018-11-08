import {Stone} from "./Stone";
import {GameLogic} from "./GameLogic"
import {Constants} from "../Constants"
import {DestroyAnimation} from "./DestroyAnimation"
import {AnimatedNumber} from "./AnimatedNumber"
import {Resources} from "../Resources"

var Layer = cc.Layer.extend({
  gameLogic:GameLogic,
  scoreNumber:null,
  stepsNumber:null,
  targetNumber:null,
  ctor:function () {
    this._super();
    var size = cc.winSize;
    this.gameLogic = new GameLogic(this);
    var gameBackground = new cc.Sprite(Resources.res.gameBackground);
    gameBackground.setPosition(size.width/2, size.height/2);
    this.addChild(gameBackground, -127);

    this.scoreNumber = new AnimatedNumber(4);
    this.scoreNumber.x = size.width * 0.6;
    this.scoreNumber.y = size.height * 0.91;
    this.scoreNumber.scaleX = 0.8;
    this.addChild(this.scoreNumber);
    this.stepsNumber = new AnimatedNumber(3);
    this.stepsNumber.x = 50;
    this.stepsNumber.y = size.height * 0.93;
    this.addChild(this.stepsNumber);
    this.targetNumber = new AnimatedNumber(4);
    this.targetNumber.x = size.width * 0.6;
    this.targetNumber.y = size.height * 0.97;
    this.targetNumber.scaleX = 0.8;
    this.addChild(this.targetNumber);

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
      var stone = new Stone( Math.floor(Math.random()*5));
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
