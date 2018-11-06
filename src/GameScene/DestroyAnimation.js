import {Resources} from "../Resources"

export var DestroyAnimation = cc.Sprite.extend({
  type:0,

  ctor:function(x,y){
    var spriteFrames = Resources.getSpriteFrames("destroyAnimation");
    this._super(spriteFrames[0]);
    var animFrames = [];
    for(var spriteFrame of spriteFrames){
     var animFrame = new cc.AnimationFrame(spriteFrame, 1, null);
     animFrames.push(animFrame);
   }
   var animation = new cc.Animation(animFrames, 0.05, 1);
   var animateAction = cc.Animate.create(animation);
   this.runAction(animateAction);
   this.setPosition(x,y);
  this.runAction(new cc.Sequence( animateAction, new cc.callFunc(this.deleteFromParent, this)));
},

deleteFromParent(){
  this.removeFromParent();
}
});
