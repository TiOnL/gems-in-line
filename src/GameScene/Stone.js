import {Resources} from "../Resources"

export var Stone = cc.Sprite.extend({
  type:0,

  ctor:function(type){
    this.type = type;
    var spriteFrames = Resources.getSpriteFrames("stone"+type);
    this._super(spriteFrames[0]);
    this.highlightOff();
    var animFrames = [];
    for(var spriteFrame of spriteFrames){
     var animFrame = new cc.AnimationFrame(spriteFrame, 1, null);
     animFrames.push(animFrame);
   }
   var animation = new cc.Animation(animFrames, 0.05, 1);
   var animateAction = cc.Animate.create(animation);
   var sequence = new cc.Sequence( animateAction, new cc.DelayTime(3));
   this.runAction(sequence.repeatForever());

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
