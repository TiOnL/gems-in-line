import {Resources} from "../Resources"

export var Stone = cc.Sprite.extend({
  type:0,

  ctor:function(type){
    this.type = type;
    var spriteFrames = Resources.getSpriteFrames("stone"+type);
    this._super(spriteFrames[0]);
    this.highlightOff();

  },

  highlightOn: function(){
    this.setColor(cc.color(255,255,255,255));
  },

  highlightOff: function(){
   this.setColor(cc.color(128,128,128,255));
 },

  moveTo(duration, x,y){
    return new Promise((resolve, reject) => {
      this.runAction(new cc.Sequence( new cc.MoveTo(duration, x, y), new cc.callFunc(resolve, this)));
    });
  }



});
