import {GameScene} from "./GameScene/GameScene"
import {Resources} from "./Resources"


var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {

        this._super();

        var size = cc.winSize;

        var info = "  Touch gem to select, and \ntouch adjacent one to swap it. \n"+
        "  Place 4 gems to each other, \nto make them dissapear.\n"+
        "\n  You will receive extra steps, if 5 \nor more gems are dissapearing \nor "+
        "in case of chain reaction. \n  You will win if you reach a \ntarget score.";
        var helloLabel = new cc.LabelTTF("Touch to start", "Arial", 58);
        helloLabel.setPosition(size.width/2, size.height*0.75);
        this.addChild(helloLabel, 5);
        var rulesLabel = new cc.LabelTTF("Rules", "Arial", 58);
        rulesLabel.setPosition(size.width/2, size.height*0.5);
        this.addChild(rulesLabel, 5);

        var infoLabel = new cc.LabelTTF(info, "Arial", 38);
        infoLabel.setPosition(size.width/2, size.height*0.3);
        this.addChild(infoLabel, 5);

        var bgSprite = new cc.Sprite(Resources.res.infoBackground);
        bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(bgSprite, -1);
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
