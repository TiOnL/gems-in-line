import {Stone} from "./Stone";
import {GameLogic} from "./GameLogic"
import {Constants} from "../Constants"
import {DestroyAnimation} from "./DestroyAnimation"
import {AnimatedNumber} from "./AnimatedNumber"
import {Resources} from "../Resources"
import {LevelData} from "./LevelData"
import {EndScene} from "../EndScene"
import {touchOnce} from "../Util"

var Layer = cc.Layer.extend({
  gameLogic:GameLogic,
  scoreNumber:null,
  stepsNumber:null,
  targetNumber:null,
  currentLevel:0,
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
    this.gameLogic.onGameEnded = (won)=>{
      if(won){
        var stageClear = new cc.Sprite(Resources.res.stageClear);
        stageClear.setPosition(size.width/2, size.height/2);
        this.addChild(stageClear);
        touchOnce(()=>{
          this.gameLogic.reset();
          stageClear.removeFromParent();
          this.startLevel(this.currentLevel+1);
        },this);
      }else{
        var stageFailMsg = new cc.Sprite(Resources.res.stageFail);
        stageFailMsg.setPosition(size.width/2, size.height/2);
        this.addChild(stageFailMsg);
        touchOnce(()=>{
          stageFailMsg.removeFromParent();
          this.gameLogic.reset();
          this.startLevel(this.currentLevel);
        },this);
      }
    };
    this.startLevel(1);
    cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          onTouchBegan: (touch, event) =>{
              console.log("onTouch");
              this.gameLogic.onClick(touch.getLocation());
          }
        }, this);
    this.scheduleUpdate();
  },

  startLevel(level){
    this.currentLevel = level;
    if(!LevelData[level]){
      this.endGame();
      return;
    }
    var column = 0;
    for(var stoneType of LevelData[level].startStones){
      var stone = new Stone(stoneType);
      this.gameLogic.addStone(stone, column);
      column = (column+1)%Constants.GAME_FIELD_COLUMN_COUNT
    }
    for(var stoneType of LevelData[level].addStones){
      var stone = new Stone(stoneType);
      this.gameLogic.additionalStones.push(stone);
    }
    this.gameLogic.steps = LevelData[level].steps;
    this.gameLogic.target = LevelData[level].target;
  },

  addDestroyAnimation(x,y){
    var sprite = new DestroyAnimation(x,y);
    this.addChild(sprite);
  },

  endGame(){
    cc.eventManager.removeAllListeners();
    cc.director.runScene(new EndScene());
  },

  update(dt){
    this.gameLogic.update(dt);
    this.scoreNumber.setValue(this.gameLogic.score);
    this.stepsNumber.setValue(this.gameLogic.steps);
    this.targetNumber.setValue(this.gameLogic.target);
  }

});

export var GameScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    var layer = new Layer();
    this.addChild(layer);
  }
});
