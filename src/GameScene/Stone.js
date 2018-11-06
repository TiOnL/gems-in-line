import {Resources} from "../Resources"

export var Stone = cc.Sprite.extend({
  type:0,

  ctor:function(type){
    this.type = type;
    var spriteFrames = Resources.getSpriteFrames("stone"+type);
    this._super(spriteFrames[0]);

  }



});
