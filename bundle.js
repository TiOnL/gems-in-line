/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/bundleMain.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Constants.js":
/*!**************************!*\
  !*** ./src/Constants.js ***!
  \**************************/
/*! exports provided: Constants */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Constants", function() { return Constants; });
var Constants = {
  GAME_FIELD_COLUMN_COUNT:6,
  GAME_FIELD_ROW_COUNT:7,
  GAME_FIELD_LEFT: 13,
  GAME_FIELD_BOTTOM:128,
  GAME_FIELD_CELL_SIZE:128,
  FALL_ACCELERATION:20000
}


/***/ }),

/***/ "./src/EndScene.js":
/*!*************************!*\
  !*** ./src/EndScene.js ***!
  \*************************/
/*! exports provided: EndScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EndScene", function() { return EndScene; });
/* harmony import */ var _StartScene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StartScene */ "./src/StartScene.js");
/* harmony import */ var _Resources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Resources */ "./src/Resources.js");




var Layer = cc.Layer.extend({
  sprite:null,
  ctor:function () {
    this._super();
    var size = cc.winSize;
    var helloLabel = new cc.LabelTTF("END", "Arial", 88);
    helloLabel.x = size.width / 2;
    helloLabel.y = size.height *0.75 ;
    this.addChild(helloLabel, 5);

    const info = "Game programming:\n\n   Filatov Evgenii"+
    "\n\nGame resources:\n\n   opengameart.org \n\n   Filatov Evgenii";
    var infoLabel = new cc.LabelTTF(info, "Arial", 38);
    infoLabel.setPosition(size.width/2, size.height*0.3);
    this.addChild(infoLabel, 5);

    var bgSprite = new cc.Sprite(_Resources__WEBPACK_IMPORTED_MODULE_1__["Resources"].res.infoBackground);
    bgSprite.attr({
        x: size.width / 2,
        y: size.height / 2
    });
    this.addChild(bgSprite);

    cc.eventManager.addListener({
      event: cc.EventListener.KEYBOARD,
      onKeyPressed: (keyCode, event) =>{
        if (keyCode == cc.KEY.enter){
          cc.eventManager.removeAllListeners();
          cc.director.runScene(new _StartScene__WEBPACK_IMPORTED_MODULE_0__["StartScene"]());
        }
      }
    }, this);
    cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      onTouchBegan: (keyCode, event) =>{
        cc.eventManager.removeAllListeners();
        cc.director.runScene(new _StartScene__WEBPACK_IMPORTED_MODULE_0__["StartScene"]());
      }
    }, this);
    return true;
  }
});

var EndScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    var layer = new Layer();
    this.addChild(layer);
  }
});


/***/ }),

/***/ "./src/GameScene/AnimatedNumber.js":
/*!*****************************************!*\
  !*** ./src/GameScene/AnimatedNumber.js ***!
  \*****************************************/
/*! exports provided: AnimatedNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimatedNumber", function() { return AnimatedNumber; });


var AnimatedNumber = cc.Node.extend({
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


/***/ }),

/***/ "./src/GameScene/DestroyAnimation.js":
/*!*******************************************!*\
  !*** ./src/GameScene/DestroyAnimation.js ***!
  \*******************************************/
/*! exports provided: DestroyAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DestroyAnimation", function() { return DestroyAnimation; });
/* harmony import */ var _Resources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Resources */ "./src/Resources.js");


var DestroyAnimation = cc.Sprite.extend({
  type:0,

  ctor:function(x,y){
    var spriteFrames = _Resources__WEBPACK_IMPORTED_MODULE_0__["Resources"].getSpriteFrames("destroyAnimation");
    this._super(spriteFrames[0]);
    var animFrames = [];
    for(var spriteFrame of spriteFrames){
     var animFrame = new cc.AnimationFrame(spriteFrame, 1, null);
     animFrames.push(animFrame);
   }
   var animation = new cc.Animation(animFrames, 0.05, 1);
   var animateAction = cc.Animate.create(animation);
   this.setPosition(x,y);
  this.runAction(new cc.Sequence( animateAction, new cc.callFunc(this.deleteFromParent, this)));
},

deleteFromParent(){
  this.removeFromParent();
}
});


/***/ }),

/***/ "./src/GameScene/GameLogic.js":
/*!************************************!*\
  !*** ./src/GameScene/GameLogic.js ***!
  \************************************/
/*! exports provided: GameLogic */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameLogic", function() { return GameLogic; });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");



const STATUS_WAITING = 0;
const STATUS_SWAPPING = 1;
const STATUS_DESTROYING = 2;
const STATUS_FALLING = 3;
const STATUS_GAMEENDED = 4;

var GameLogic = function(scene){
  this.scene = scene;
  this.status = STATUS_WAITING;
  this.selectedCell = null;
  this.fallingTime = null;
  this.score = 0;
  this.steps = 0;
  this.target = 0;
  this.additionalStones = [];
  this.onGameEnded = null;
  this.desroyCombo = 0;
  this.cup = new Array(_Constants__WEBPACK_IMPORTED_MODULE_0__["Constants"].GAME_FIELD_COLUMN_COUNT);
  for(var i=0; i < _Constants__WEBPACK_IMPORTED_MODULE_0__["Constants"].GAME_FIELD_COLUMN_COUNT; i++){
    this.cup[i] = new Array();
  }
};

function getCellX(column){
  return _Constants__WEBPACK_IMPORTED_MODULE_0__["Constants"].GAME_FIELD_LEFT+(column+0.5)*_Constants__WEBPACK_IMPORTED_MODULE_0__["Constants"].GAME_FIELD_CELL_SIZE;
}

function getCellY(row){
  return _Constants__WEBPACK_IMPORTED_MODULE_0__["Constants"].GAME_FIELD_BOTTOM+(row+0.5)*_Constants__WEBPACK_IMPORTED_MODULE_0__["Constants"].GAME_FIELD_CELL_SIZE;
}

function getColumn(x){
 return Math.floor((x-_Constants__WEBPACK_IMPORTED_MODULE_0__["Constants"].GAME_FIELD_LEFT)/_Constants__WEBPACK_IMPORTED_MODULE_0__["Constants"].GAME_FIELD_CELL_SIZE);
}

function getRow(y){
 return Math.floor((y-_Constants__WEBPACK_IMPORTED_MODULE_0__["Constants"].GAME_FIELD_BOTTOM)/_Constants__WEBPACK_IMPORTED_MODULE_0__["Constants"].GAME_FIELD_CELL_SIZE);
}

GameLogic.prototype.reset = function(){
  for (var i = 0; i< this.cup.length; i++){
    for(var j = 0; j< this.cup[i].length; j++){
      if(this.cup[i][j]){
        this.cup[i][j].removeFromParent();
        this.cup[i][j] = null;
      }
    }
  }
  this.score = 0;
  this.additionalStones = [];
  this.status = STATUS_WAITING;
}

GameLogic.prototype.addStone = function(stone, columnNumber){
  console.log("stone added");
  var rowMinFreePos = 0;
  while(rowMinFreePos<this.cup[columnNumber].length &&
        this.cup[columnNumber][rowMinFreePos]!=null){
          rowMinFreePos++;
        };
 stone.setPosition(getCellX(columnNumber), getCellY(rowMinFreePos));
 this.cup[columnNumber][rowMinFreePos] = stone;
 this.scene.addChild(stone);
}

GameLogic.prototype.addStoneToTop = function(stone, columnNumber){
  console.log("stone added");
  var rowMaxFilledPos = this.cup[columnNumber].length-1;
  while (rowMaxFilledPos > -1 && this.cup[columnNumber][rowMaxFilledPos] ==null){
    rowMaxFilledPos--;
  }
 stone.setPosition(getCellX(columnNumber), getCellY(rowMaxFilledPos+1));
 this.cup[columnNumber][rowMaxFilledPos+1] = stone;
 this.scene.addChild(stone);
}

GameLogic.prototype.update = function(dt){
  if(this.status == STATUS_FALLING){
    this.falling(dt);
  }
}

GameLogic.prototype.onClick = function(location){
  if(this.status != STATUS_WAITING) return;
  var clickRow = getRow(location.y);
  var clickColumn = getColumn(location.x);
  var hasStoneClicked = (clickColumn >= 0 && clickColumn < this.cup.length &&
      clickRow>=0 && clickRow < this.cup[clickColumn].length &&
      this.cup[clickColumn][clickRow] != null);
  if(this.selectedCell && hasStoneClicked && this.steps > 0 &&
      Math.abs(this.selectedCell.row - clickRow) +
      Math.abs(this.selectedCell.column - clickColumn) == 1){
        this.status = STATUS_SWAPPING;
        this.steps--;
        this.cup[this.selectedCell.column][this.selectedCell.row].moveTo(1.0,
           getCellX(clickColumn), getCellY(clickRow)).then(()=>{
             this.status = STATUS_DESTROYING;
             this.startDestroy();
           });
        this.cup[clickColumn][clickRow].moveTo(1.0,
          getCellX(this.selectedCell.column), getCellY(this.selectedCell.row));
        this.cup[this.selectedCell.column][this.selectedCell.row].highlightOff();
        //actually swap
        var tmp = this.cup[this.selectedCell.column][this.selectedCell.row];
        this.cup[this.selectedCell.column][this.selectedCell.row] = this.cup[clickColumn][clickRow];
        this.cup[clickColumn][clickRow] = tmp;
        this.selectedCell = null;
  }else{
    if(this.selectedCell){
      console.log("unselect");
      this.cup[this.selectedCell.column][this.selectedCell.row].highlightOff();
      this.selectedCell = null;

    }
    if(hasStoneClicked){
      console.log("select");
      this.selectedCell = {row:clickRow, column:clickColumn};
      this.cup[clickColumn][clickRow].highlightOn();
    }
  }
}

GameLogic.prototype.startDestroy = function(){
  var destroyLists = [];
  var checkedFlags = [];
  this.desroyCombo ++;
  for(var i = 0; i< _Constants__WEBPACK_IMPORTED_MODULE_0__["Constants"].GAME_FIELD_COLUMN_COUNT; i++){
    checkedFlags[i] = new Array(this.cup[i].length);
  }
  var findSameTypeArea = (sameList, stoneType, column, row)=>{
    if(!checkedFlags[column][row] && this.cup[column][row] &&
        this.cup[column][row].type == stoneType){
          sameList.push({column:column, row:row});
          checkedFlags[column][row] = true;
          if(column > 0) findSameTypeArea(sameList, stoneType, column-1, row);
          if(column < _Constants__WEBPACK_IMPORTED_MODULE_0__["Constants"].GAME_FIELD_COLUMN_COUNT -1){
            findSameTypeArea(sameList, stoneType, column+1, row);
          }
          if(row > 0) findSameTypeArea(sameList, stoneType, column, row-1);
          if(row < this.cup[column].length-1)findSameTypeArea(sameList, stoneType, column, row+1);
        }
  }

  for(var i=0; i< _Constants__WEBPACK_IMPORTED_MODULE_0__["Constants"].GAME_FIELD_COLUMN_COUNT; i++)
    for (var j = 0; j< this.cup[i].length; j++)
      if(this.cup[i][j]){
        var list = [];
        findSameTypeArea(list,this.cup[i][j].type, i,j);
        if(list.length>3){
          destroyLists.push(list);
        }
      }

    if(destroyLists.length == 0){
      this.desroyCombo = 0;
      this.status = STATUS_WAITING;
      if(this.score >= this.target || this.steps == 0){
        this.status = STATUS_GAMEENDED;
        this.onGameEnded(this.score >= this.target);
      }
      return;
    }

    for(var destroyList of destroyLists){
      for( var elem of destroyList){
        this.scene.addDestroyAnimation(getCellX(elem.column), getCellY(elem.row));
      }
      this.steps += (this.desroyCombo-1)+Math.max(0,destroyList.length-4); 
      this.score += Math.round(Math.sqrt(this.desroyCombo)*destroyList.length);
    }
    setTimeout( ()=>{
      for(var destroyList of destroyLists){
        for( var elem of destroyList){
          var stoneToAdd = this.additionalStones.shift();
          if(stoneToAdd){
            this.addStoneToTop(stoneToAdd, elem.column);
          }
          this.cup[elem.column][elem.row].removeFromParent();
          this.cup[elem.column][elem.row] = null;
        }
      }
      this.status = STATUS_FALLING;
      this.startFall();
    }, 500);
    console.log(destroyLists);
}

GameLogic.prototype.startFall = function(){
  this.fallingTime = 0;
  for (var col of this.cup){
    var freeSpaceCount = 0;
    for(var i =0; i<col.length; i++){
      if(col[i] == null){
        freeSpaceCount++;
      }else if(freeSpaceCount > 0){
        col[i-freeSpaceCount] = col[i];
        col[i] = null;
      }
    }

  }
}

GameLogic.prototype.falling = function(dt){
  this.fallingTime += dt;
  var stillFalling = false;
  var fallSpeed = _Constants__WEBPACK_IMPORTED_MODULE_0__["Constants"].FALL_ACCELERATION * this.fallingTime;
  for (var col of this.cup)
    for(var i = 0; i<col.length; i++){
      if(col[i] && col[i].y > getCellY(i)){
        col[i].y = Math.max(getCellY(i), col[i].y - fallSpeed*dt);
        stillFalling = true;
      }
    }

  if(!stillFalling){
    this.status = STATUS_DESTROYING;
    this.startDestroy();
  }
}


/***/ }),

/***/ "./src/GameScene/GameScene.js":
/*!************************************!*\
  !*** ./src/GameScene/GameScene.js ***!
  \************************************/
/*! exports provided: GameScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameScene", function() { return GameScene; });
/* harmony import */ var _Stone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Stone */ "./src/GameScene/Stone.js");
/* harmony import */ var _GameLogic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameLogic */ "./src/GameScene/GameLogic.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Constants */ "./src/Constants.js");
/* harmony import */ var _DestroyAnimation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DestroyAnimation */ "./src/GameScene/DestroyAnimation.js");
/* harmony import */ var _AnimatedNumber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AnimatedNumber */ "./src/GameScene/AnimatedNumber.js");
/* harmony import */ var _Resources__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Resources */ "./src/Resources.js");
/* harmony import */ var _LevelData__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./LevelData */ "./src/GameScene/LevelData.js");
/* harmony import */ var _EndScene__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../EndScene */ "./src/EndScene.js");
/* harmony import */ var _Util__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Util */ "./src/Util.js");










var Layer = cc.Layer.extend({
  gameLogic:_GameLogic__WEBPACK_IMPORTED_MODULE_1__["GameLogic"],
  scoreNumber:null,
  stepsNumber:null,
  targetNumber:null,
  currentLevel:0,
  levelLabel:null,
  ctor:function () {
    this._super();
    var size = cc.winSize;
    this.gameLogic = new _GameLogic__WEBPACK_IMPORTED_MODULE_1__["GameLogic"](this);
    var gameBackground = new cc.Sprite(_Resources__WEBPACK_IMPORTED_MODULE_5__["Resources"].res.gameBackground);
    gameBackground.setPosition(size.width/2, size.height/2);
    this.addChild(gameBackground, -127);

    this.scoreNumber = new _AnimatedNumber__WEBPACK_IMPORTED_MODULE_4__["AnimatedNumber"](3);
    this.scoreNumber.x = size.width * 0.53;
    this.scoreNumber.y = size.height * 0.90;
    this.scoreNumber.scaleX = 0.8;
    this.addChild(this.scoreNumber);
    this.stepsNumber = new _AnimatedNumber__WEBPACK_IMPORTED_MODULE_4__["AnimatedNumber"](3);
    this.stepsNumber.x = 50;
    this.stepsNumber.y = size.height * 0.90;
    this.addChild(this.stepsNumber);
    this.targetNumber = new _AnimatedNumber__WEBPACK_IMPORTED_MODULE_4__["AnimatedNumber"](3);
    this.targetNumber.x = size.width * 0.53;
    this.targetNumber.y = size.height * 0.96;
    this.targetNumber.scaleX = 0.8;
    this.addChild(this.targetNumber);
    this.levelLabel = new cc.LabelTTF("1", "Serif Bold", 80);
    this.levelLabel.x = size.width * 0.85;
    this.levelLabel.y = size.height *0.90 ;
    this.addChild(this.levelLabel, 5);

    this.gameLogic.onGameEnded = (won)=>{
      if(won){
        var stageClear = new cc.Sprite(_Resources__WEBPACK_IMPORTED_MODULE_5__["Resources"].res.stageClear);
        stageClear.setPosition(size.width/2, size.height/2);
        this.addChild(stageClear);
        Object(_Util__WEBPACK_IMPORTED_MODULE_8__["touchOnce"])(()=>{
          this.gameLogic.reset();
          stageClear.removeFromParent();
          this.startLevel(this.currentLevel+1);
        },this);
      }else{
        var stageFailMsg = new cc.Sprite(_Resources__WEBPACK_IMPORTED_MODULE_5__["Resources"].res.stageFail);
        stageFailMsg.setPosition(size.width/2, size.height/2);
        this.addChild(stageFailMsg);
        Object(_Util__WEBPACK_IMPORTED_MODULE_8__["touchOnce"])(()=>{
          stageFailMsg.removeFromParent();
          this.gameLogic.reset();
          this.startLevel(this.currentLevel);
        },this);
      }
    };
    this.startLevel(1);
    cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          onTouchBegan: (touch, event) =>{
              console.log("onTouch");
              this.gameLogic.onClick(touch.getLocation());
          }
        }, this);
    this.scheduleUpdate();
  },

  startLevel(level){
    this.currentLevel = level;
    if(!_LevelData__WEBPACK_IMPORTED_MODULE_6__["LevelData"][level]){
      this.endGame();
      return;
    }
    this.levelLabel.setString(String(level));
    var column = 0;
    for(var stoneType of _LevelData__WEBPACK_IMPORTED_MODULE_6__["LevelData"][level].startStones){
      var stone = new _Stone__WEBPACK_IMPORTED_MODULE_0__["Stone"](stoneType);
      this.gameLogic.addStone(stone, column);
      column = (column+1)%_Constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].GAME_FIELD_COLUMN_COUNT
    }
    for(var stoneType of _LevelData__WEBPACK_IMPORTED_MODULE_6__["LevelData"][level].addStones){
      var stone = new _Stone__WEBPACK_IMPORTED_MODULE_0__["Stone"](stoneType);
      this.gameLogic.additionalStones.push(stone);
    }
    this.gameLogic.steps = _LevelData__WEBPACK_IMPORTED_MODULE_6__["LevelData"][level].steps;
    this.gameLogic.target = _LevelData__WEBPACK_IMPORTED_MODULE_6__["LevelData"][level].target;
  },

  addDestroyAnimation(x,y){
    var sprite = new _DestroyAnimation__WEBPACK_IMPORTED_MODULE_3__["DestroyAnimation"](x,y);
    this.addChild(sprite);
  },

  endGame(){
    cc.eventManager.removeAllListeners();
    cc.director.runScene(new _EndScene__WEBPACK_IMPORTED_MODULE_7__["EndScene"]());
  },

  update(dt){
    this.gameLogic.update(dt);
    this.scoreNumber.setValue(this.gameLogic.score);
    this.stepsNumber.setValue(this.gameLogic.steps);
    this.targetNumber.setValue(this.gameLogic.target);
  }

});

var GameScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    var layer = new Layer();
    this.addChild(layer);
  }
});


/***/ }),

/***/ "./src/GameScene/LevelData.js":
/*!************************************!*\
  !*** ./src/GameScene/LevelData.js ***!
  \************************************/
/*! exports provided: LevelData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LevelData", function() { return LevelData; });
const LevelData = [
  {
    //Dummy Level 0
  },
  {
    target:1,
    steps:1,
    startStones:[0,1,1,3,1,2,3,3,2,1,4,3],
    addStones:[]
  },
  {
    target:1,
    steps:1,
    startStones:[0,2,1,1,4,3,3,4,1,0,1,2],
    addStones:[]
  },
  {
    target:5,
    steps:2,
    startStones:[3,3,3,2,0,0,1,4,1,2,4,1,3,0,3,2,0,2],
    addStones:[]
  },
  {
    target:5,
    steps:4,
    startStones:[1,2,1,1,4,2,0,4,2,0,3,4,2,3,4,1,0,3],
    addStones:[1,2,4,3,4,0,2,1,2,3,3,4,3,2,1]
  },
  {
    target:40,
    steps:10,
    startStones:[1,2,3,1,2,4,3,4,0,2,1,2,3,3,4,3,2,1,0,2,1,2,3,3,4,3,2,1,0,2],
    addStones:[2,3,1,2,4,3,4,0,2,1,2,3,3,4,3,2,1,2,3,1,2,4,3,4,0,2,1,2,3,3,4,3,2,1,
    1,2,3,4,0,1,2,3,4,0]
  },
  {
    target:100,
    steps:2,
    startStones:[2,0,0,2,2,0,1,1,0,3,4,2,2,2,3,1,2,0,2,1,3,2,4,3,3,0,4,0,1,1],
    addStones:[4,3,4,2,3,1,0,2,1,1,4,3,3,4,1,0,1,2,3,3,3,2,0,0,1,4,1,2,4,1,3,0,3,
      2,0,2,2,0,0,2,2,0,1,1,0,3,4,2,2,3,1,2,0,2,1,3,2,4,3,3,0,4,0,1,1,4,3,4,2,3,
      1,0,2,1,1,4,3,3,4,1,0,1,2,3,3,3]
  },
  {
    target:500,
    steps:3,
    startStones:[0,1,4,0,4,0,4,2,3,0,3,4,3,1,3,2,4,1,1,4,0,1,3,2,3,2,4,1,1,4,3,3,2,0,2,2],
    addStones:[1,4,2,3,0,4,1,3,0,2,0,4,4,0,3,2,3,1,3,0,2,1,2,3,4,1,2,3,4,1,2,3,4,
      4,3,4,2,3,1,0,2,1,1,4,3,3,4,1,0,1,2,3,3,3,2,0,0,1,4,1,2,4,1,3,0,3,
      2,0,2,2,0,0,2,2,0,1,1,0,3,4,2,2,3,1,2,0,2,1,3,2,4,3,3,0,4,0,1,1,4,3,4,2,3,
      1,0,2,1,1,4,3,3,4,1,0,1,2,3,1,4,2,3,0,4,1,3,0,2,0,4,4,0,3,2,3,1,3,0,2,1,2,3,4,1,2,3,4,1,2,3,4,
      4,3,4,2,3,1,0,2,1,1,4,3,3,4,1,0,1,2,3,3,3,2,0,0,1,4,1,2,4,1,3,0,3,
      2,0,2,2,0,0,2,2,0,1,1,0,3,4,2,2,3,1,2,0,2,1,3,2,4,3,3,0,4,0,1,1,4,3,4,2,3,
      1,0,2,1,1,4,3,3,4,1,0,1,2,3,1,4,2,3,0,4,1,3,0,2,0,4,4,0,3,2,3,1,3,0,2,1,2,3,4,1,2,3,4,1,2,3,4,
      4,3,4,2,3,1,0,2,1,1,4,3,3,4,1,0,1,2,3,3,3,2,0,0,1,4,1,2,4,1,3,0,3,
      2,0,2,2,0,0,2,2,0,1,1,0,3,4,2,2,3,1,2,0,2,1,3,2,4,3,3,0,4,0,1,1,4,3,4,2,3,
      1,0,2,1,1,4,3,3,4,1,0,1,2,3,1,4,2,3,0,4,1,3,0,2,0,4,4,0,3,2,3,1,3,0,2,1,2,3,4,1,2,3,4,1,2,3,4,
      4,3,4,2,3,1,0,2,1,1,4,3,3,4,1,0,1,2,3,3,3,2,0,0,1,4,1,2,4,1,3,0,3,
      2,0,2,2,0,0,2,2,0,1,1,0,3,4,2,2,3,1,2,0,2,1,3,2,4,3,3,0,4,0,1,1,4,3,4,2,3,
      1,0,2,1,1,4,3,3,4,1,0,1,2,3,1,4,2,3,0,4,1,3,0,2,0,4,4,0,3,2,3,1,3,0,2,1,2,3,4,1,2,3,4,1,2,3,4,
      4,3,4,2,3,1,0,2,1,1,4,3,3,4,1,0,1,2,3,3,3,2,0,0,1,4,1,2,4,1,3,0,3,
      2,0,2,2,0,0,2,2,0,1,1,0,3,4,2,2,3,1,2,0,2,1,3,2,4,3,3,0,4,0,1,1,4,3,4,2,3,
      1,0,2,1,1,4,3,3,4,1,0,1,2,3]
    }



];


/***/ }),

/***/ "./src/GameScene/Stone.js":
/*!********************************!*\
  !*** ./src/GameScene/Stone.js ***!
  \********************************/
/*! exports provided: Stone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stone", function() { return Stone; });
/* harmony import */ var _Resources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Resources */ "./src/Resources.js");


var Stone = cc.Sprite.extend({
  type:0,

  ctor:function(type){
    this.type = type;
    var spriteFrames = _Resources__WEBPACK_IMPORTED_MODULE_0__["Resources"].getSpriteFrames("stone"+type);
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


/***/ }),

/***/ "./src/Resources.js":
/*!**************************!*\
  !*** ./src/Resources.js ***!
  \**************************/
/*! exports provided: Resources */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Resources", function() { return Resources; });

var Resources = {
  res:{
    gameBackground : "res/gameBackground.png",
    stageClear:"res/stageClear.png",
    stageFail:"res/stageFail.png",
    startScreen:"res/startScreen.png",
    infoBackground:"res/infoBackground.png"
  },
  frames:{
    "stone0":{
      texture: "res/stones/gem0.png",
      frames:[{x:0,y:0,h:128,w:128},
        {x:128,y:0,h:128,w:128},
        {x:0,y:128,h:128,w:128},
        {x:128,y:128,h:128,w:128},
        {x:256,y:0,h:128,w:128},
        {x:0,y:256,h:128,w:128},
        {x:128,y:256,h:128,w:128},
        {x:256,y:128,h:128,w:128},
        {x:256,y:128,h:128,w:128},
        {x:384,y:0,h:128,w:128},
        {x:256,y:128,h:128,w:128},
        {x:256,y:128,h:128,w:128},
        {x:128,y:256,h:128,w:128},
        {x:0,y:256,h:128,w:128},
        {x:256,y:0,h:128,w:128},
        {x:128,y:128,h:128,w:128},
        {x:0,y:128,h:128,w:128},
        {x:128,y:0,h:128,w:128},
        {x:0,y:0,h:128,w:128},
      ]
    },

    "stone1":{
      texture: "res/stones/gem1.png",
      frames:[{x:0,y:0,h:128,w:128},
        {x:128,y:0,h:128,w:128},
        {x:0,y:128,h:128,w:128},
        {x:128,y:128,h:128,w:128},
        {x:256,y:0,h:128,w:128},
        {x:0,y:256,h:128,w:128},
        {x:128,y:256,h:128,w:128},
        {x:256,y:128,h:128,w:128},
        {x:256,y:128,h:128,w:128},
        {x:384,y:0,h:128,w:128},
        {x:256,y:128,h:128,w:128},
        {x:256,y:128,h:128,w:128},
        {x:128,y:256,h:128,w:128},
        {x:0,y:256,h:128,w:128},
        {x:256,y:0,h:128,w:128},
        {x:128,y:128,h:128,w:128},
        {x:0,y:128,h:128,w:128},
        {x:128,y:0,h:128,w:128},
        {x:0,y:0,h:128,w:128},
      ]
    },

    "stone2":{
      texture: "res/stones/gem2.png",
      frames:[{x:0,y:0,h:128,w:128},
        {x:128,y:0,h:128,w:128},
        {x:0,y:128,h:128,w:128},
        {x:128,y:128,h:128,w:128},
        {x:256,y:0,h:128,w:128},
        {x:0,y:256,h:128,w:128},
        {x:128,y:256,h:128,w:128},
        {x:256,y:128,h:128,w:128},
        {x:256,y:128,h:128,w:128},
        {x:384,y:0,h:128,w:128},
        {x:256,y:128,h:128,w:128},
        {x:256,y:128,h:128,w:128},
        {x:128,y:256,h:128,w:128},
        {x:0,y:256,h:128,w:128},
        {x:256,y:0,h:128,w:128},
        {x:128,y:128,h:128,w:128},
        {x:0,y:128,h:128,w:128},
        {x:128,y:0,h:128,w:128},
        {x:0,y:0,h:128,w:128},
      ]
    },

    "stone3":{
      texture: "res/stones/gem3.png",
      frames:[{x:0,y:0,h:128,w:128},
        {x:128,y:0,h:128,w:128},
        {x:256,y:0,h:128,w:128},
        {x:384,y:0,h:128,w:128},
        {x:0,y:128,h:128,w:128},
        {x:128,y:128,h:128,w:128},
        {x:256,y:128,h:128,w:128},
        {x:384,y:128,h:128,w:128},
        {x:0,y:256,h:128,w:128},
        {x:128,y:256,h:128,w:128},

        {x:0,y:256,h:128,w:128},
        {x:384,y:128,h:128,w:128},
        {x:256,y:128,h:128,w:128},
        {x:128,y:128,h:128,w:128},
        {x:0,y:128,h:128,w:128},
        {x:384,y:0,h:128,w:128},
        {x:256,y:0,h:128,w:128},
        {x:128,y:0,h:128,w:128},
        {x:0,y:0,h:128,w:128}
      ]
    },

    "stone4":{
      texture: "res/stones/gem4.png",
      frames:[{x:0,y:0,h:128,w:128},
        {x:128,y:0,h:128,w:128},
        {x:256,y:0,h:128,w:128},
        {x:384,y:0,h:128,w:128},
        {x:0,y:128,h:128,w:128},
        {x:128,y:128,h:128,w:128},
        {x:256,y:128,h:128,w:128},
        {x:384,y:128,h:128,w:128},
        {x:0,y:256,h:128,w:128},
        {x:128,y:256,h:128,w:128},

        {x:0,y:256,h:128,w:128},
        {x:384,y:128,h:128,w:128},
        {x:256,y:128,h:128,w:128},
        {x:128,y:128,h:128,w:128},
        {x:0,y:128,h:128,w:128},
        {x:384,y:0,h:128,w:128},
        {x:256,y:0,h:128,w:128},
        {x:128,y:0,h:128,w:128},
        {x:0,y:0,h:128,w:128}
      ]
    },

    "destroyAnimation":{
      texture: "res/explosion115.png",
      frames:[{x:0,y:0,h:256,w:256},
        {x:256,y:0,h:256,w:256},
        {x:512,y:0,h:256,w:256},
        {x:768,y:0,h:256,w:256},

        {x:0,y:256,h:256,w:256},
        {x:256,y:256,h:256,w:256},
        {x:512,y:256,h:256,w:256},
        {x:768,y:256,h:256,w:256},

        {x:0,y:512,h:256,w:256},
        {x:256,y:512,h:256,w:256},
        {x:512,y:512,h:256,w:256},
        {x:768,y:512,h:256,w:256},

        {x:0,y:768,h:256,w:256},
        {x:256,y:768,h:256,w:256},
        {x:512,y:768,h:256,w:256},
        {x:768,y:768,h:256,w:256},
      ]
    }
  },

  getAllImages:function(){
    return findStrings([this]);
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

function findStrings(object){
  var strings = [];
  if(typeof object == "string"){
    strings.push(object);
    return strings;
  }
  if(Array.isArray(object)){
    for(var elem of object){
      strings = strings.concat(findStrings(elem));
    }
  } else if(typeof object == "object"){
    for(var key in object){
      strings = strings.concat(findStrings(object[key]));
    }
  }
  return strings;
}


/***/ }),

/***/ "./src/StartScene.js":
/*!***************************!*\
  !*** ./src/StartScene.js ***!
  \***************************/
/*! exports provided: StartScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartScene", function() { return StartScene; });
/* harmony import */ var _GameScene_GameScene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameScene/GameScene */ "./src/GameScene/GameScene.js");
/* harmony import */ var _Resources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Resources */ "./src/Resources.js");




var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;
        var bgSprite = new cc.Sprite(_Resources__WEBPACK_IMPORTED_MODULE_1__["Resources"].res.startScreen);
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
                       cc.director.runScene(new _GameScene_GameScene__WEBPACK_IMPORTED_MODULE_0__["GameScene"]());
                     }
                   }
                 }, this);
             cc.eventManager.addListener({
                   event: cc.EventListener.TOUCH_ONE_BY_ONE,
                   onTouchBegan: (keyCode, event) =>{
                       cc.eventManager.removeAllListeners();
                       cc.director.runScene(new _GameScene_GameScene__WEBPACK_IMPORTED_MODULE_0__["GameScene"]());
                   }
                 }, this);
        return true;
    }
});

var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});


/***/ }),

/***/ "./src/Util.js":
/*!*********************!*\
  !*** ./src/Util.js ***!
  \*********************/
/*! exports provided: touchOnce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "touchOnce", function() { return touchOnce; });
function touchOnce(callback, node){
  var touchListener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    onTouchBegan: (touch, event) =>{
        cc.eventManager.removeListener(touchListener);
        callback();
    }
  });
cc.eventManager.addListener(touchListener, node);
}


/***/ }),

/***/ "./src/bundleMain.js":
/*!***************************!*\
  !*** ./src/bundleMain.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StartScene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StartScene */ "./src/StartScene.js");
/* harmony import */ var _Resources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Resources */ "./src/Resources.js");



window.bundleStart = function(){
    var sys = cc.sys;
    if(!sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    // Pass true to enable retina display, on Android disabled by default to improve performance
    cc.view.enableRetina(sys.os === sys.OS_IOS ? true : false);

    // Disable auto full screen on baidu and wechat, you might also want to eliminate sys.BROWSER_TYPE_MOBILE_QQ
    if (sys.isMobile &&
        sys.browserType !== sys.BROWSER_TYPE_BAIDU &&
        sys.browserType !== sys.BROWSER_TYPE_WECHAT) {
        cc.view.enableAutoFullScreen(true);
    }

    // Adjust viewport meta
    cc.view.adjustViewPort(true);

    // Uncomment the following line to set a fixed orientation for your game
    // cc.view.setOrientation(cc.ORIENTATION_PORTRAIT);

    // Setup the resolution policy and design resolution size
    cc.view.setDesignResolutionSize(800, 1360, cc.ResolutionPolicy.SHOW_ALL);

    // The game will be resized when browser size change
    cc.view.resizeWithBrowserSize(true);

    //load resources
    cc.LoaderScene.preload(_Resources__WEBPACK_IMPORTED_MODULE_1__["Resources"].getAllImages(), function () {
        cc.director.runScene(new _StartScene__WEBPACK_IMPORTED_MODULE_0__["StartScene"]());
    }, this);
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map