import {GameScene} from "./GameScene/GameScene"
import {Resources} from "./Resources"


var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {

        this._super();

        var size = cc.winSize;


        var helloLabel = new cc.LabelTTF("Press enter to start", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 ;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(Resources.res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);
        cc.eventManager.addListener({
                   event: cc.EventListener.KEYBOARD,
                   onKeyPressed: (keyCode, event) =>{
                     if (keyCode == cc.KEY.enter){
                       cc.eventManager.removeAllListeners();
                       cc.director.runScene(new GameScene());
                     }
                   }
                 }, this);
             cc.eventManager.addListener({
                   event: cc.EventListener.TOUCH_ONE_BY_ONE,
                   onTouchBegan: (keyCode, event) =>{
                       cc.eventManager.removeAllListeners();
                       cc.director.runScene(new GameScene());
                   }
                 }, this);
        return true;
    }
});

export var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});
