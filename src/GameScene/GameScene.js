import {Stone} from "./Stone";
import {GameLogic} from "./GameLogic"
import {Constants} from "../Constants"

var Layer = cc.Layer.extend({
  sprite:null,
  gameLogic:GameLogic,
  ctor:function () {
    this._super();
    this.gameLogic = new GameLogic(this);
    this.startLevel();

  },

  startLevel(){
    for(var i = 0; i<30; i++){
      var stone = new Stone( Math.floor(Math.random()*2));
      this.gameLogic.addStone(stone, Math.floor(Math.random()*Constants.GAME_FIELD_COLUMN_COUNT));
    }
  }

});

export var GameScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    var layer = new Layer();
    this.addChild(layer);
  }
});
