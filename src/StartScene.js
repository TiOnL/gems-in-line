import {GameScene} from "./GameScene/GameScene"
import {Resources} from "./Resources"


var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {

        this._super();

        var size = cc.winSize;

        var info = "Rules:\n\n Touch gem to select, and touch adjacent one to swap it.\n"+
        "Place 4 gems to each other, to make them dissapear.\n"+
        "\n You will receive extra steps, if 5 or more \ngems are dissapearing or "+
        "in case of chain reaction. \n You will win if you reach a target score.";
        var helloLabel = new cc.LabelTTF("Touch to start", "Arial", 38);
        helloLabel.setPosition(size.width/2, size.height*0.7);
        this.addChild(helloLabel, 5);
        var infoLabel = new cc.LabelTTF(info, "Arial", 28);
        infoLabel.setPosition(size.width/2, size.height/2);
        this.addChild(infoLabel, 5);

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
