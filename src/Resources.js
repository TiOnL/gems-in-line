"use strict"
export var Resources = {
  res:{
    HelloWorld_png : "res/HelloWorld.png"
  },
  frames:{
    "stone0":{
      texture: "res/stones/Gem_86.png",
      frames:[{x:0,y:0,h:128,w:128}]
    },
    "stone1":{
      texture: "res/stones/Gem_90.png",
      frames:[{x:0,y:0,h:128,w:128}]
    }
  },

  getAllImages:function(){
    var result = [];
    for (var i in this.res) {
      result.push(this.res[i]);
    }
    return result;
  },

  getSpriteFrames: function(objectType){
    //// TODO: load apropriate from JSON
    var spriteFrames = [];
    var texture = cc.textureCache.addImage(this.frames[objectType].texture);
    var frames = this.frames[objectType].frames;
    for (var i=0; i< frames.length; i++){
      var spriteFrame = cc.spriteFrameCache.getSpriteFrame(objectType + "/" + i);
      if(!spriteFrame){
        spriteFrame = cc.SpriteFrame.create(texture,cc.rect(frames[i].x, frames[i].y, frames[i].w, frames[i].h));
        cc.spriteFrameCache.addSpriteFrame(spriteFrame, objectType + "/" + i);
      }
      spriteFrames.push(spriteFrame);
    }
    return spriteFrames;
  }
}
