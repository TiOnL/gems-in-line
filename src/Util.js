export function touchOnce(callback, node){
  var touchListener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    onTouchBegan: (touch, event) =>{
        cc.eventManager.removeListener(touchListener);
        callback();
    }
  });
cc.eventManager.addListener(touchListener, node);
}
