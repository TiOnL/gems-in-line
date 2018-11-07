

export var AnimatedNumber = cc.Node.extend({
  DIGIT_SIZE:64,
  _newValue:0,
  _currentValue:0,
  _digits:[],
  _animTimeLeft:0,
  animationTime:1,

  ctor(digitPlaces){
      this._super();
    digitPlaces = digitPlaces || 1;
    this._digits = [];
    for(var i = 0; i < digitPlaces; i++){
      var sprite = new cc.Sprite("res/anim-number.png", cc.rect(0,0,this.DIGIT_SIZE,this.DIGIT_SIZE));
      this._digits.push(sprite);
      sprite.x = i*this.DIGIT_SIZE;
      this.addChild(sprite);
    }


    this.scheduleUpdate();
  },

  setValue(value){
    if(this._newValue != value){
      this._newValue = value;
      this._animTimeLeft = this.animationTime;
    }
  },

  getValue(){
    return this._newValue;
  },

  update(dt){
    this._animTimeLeft = Math.max(0, this._animTimeLeft -dt);
    var digitVal = 1;
    for(var i = this._digits.length-1; i >= 0; i--){
      var oldDigit = Math.floor(this._currentValue/digitVal) % 10;
      var newDigit = Math.floor(this._newValue/digitVal) % 10;
      var interpolated = oldDigit + (newDigit-oldDigit)*(1- this._animTimeLeft/this.animationTime);
      this._digits[i].setTextureRect(new cc.rect(0,this.getTextureY(interpolated),this.DIGIT_SIZE,this.DIGIT_SIZE));
      digitVal*=10;
    }

    if(this._animTimeLeft == 0){
      this._currentValue = this._newValue;
    }


  },

  getTextureY(value){
    return this.DIGIT_SIZE * value;
  }


});
