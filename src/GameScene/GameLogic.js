"use strict"
import {Constants} from "../Constants"

const STATUS_WAITING = 0;
const STATUS_SWAPPING = 1;
const STATUS_DESTROYING = 2;
const STATUS_FALLING = 3;
const STATUS_GAMEENDED = 4;

export var GameLogic = function(scene){
  this.scene = scene;
  this.status = STATUS_WAITING;
  this.selectedCell = null;
  this.fallingTime = null;
  this.score = 0;
  this.steps = 0;
  this.target = 0;
  this.onGameEnded = null;
  this.desroyCombo = 0;
  this.cup = new Array(Constants.GAME_FIELD_COLUMN_COUNT);
  for(var i=0; i < Constants.GAME_FIELD_COLUMN_COUNT; i++){
    this.cup[i] = new Array();
  }
};

function getCellX(column){
  return Constants.GAME_FIELD_LEFT+(column+0.5)*Constants.GAME_FIELD_CELL_SIZE;
}

function getCellY(row){
  return Constants.GAME_FIELD_BOTTOM+(row+0.5)*Constants.GAME_FIELD_CELL_SIZE;
}

function getColumn(x){
 return Math.floor((x-Constants.GAME_FIELD_LEFT)/Constants.GAME_FIELD_CELL_SIZE);
}

function getRow(y){
 return Math.floor((y-Constants.GAME_FIELD_BOTTOM)/Constants.GAME_FIELD_CELL_SIZE);
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
  for(var i = 0; i< Constants.GAME_FIELD_COLUMN_COUNT; i++){
    checkedFlags[i] = new Array(this.cup[i].length);
  }
  var findSameTypeArea = (sameList, stoneType, column, row)=>{
    if(!checkedFlags[column][row] && this.cup[column][row] &&
        this.cup[column][row].type == stoneType){
          sameList.push({column:column, row:row});
          checkedFlags[column][row] = true;
          if(column > 0) findSameTypeArea(sameList, stoneType, column-1, row);
          if(column < Constants.GAME_FIELD_COLUMN_COUNT -1){
            findSameTypeArea(sameList, stoneType, column+1, row);
          }
          if(row > 0) findSameTypeArea(sameList, stoneType, column, row-1);
          if(row < this.cup[column].length-1)findSameTypeArea(sameList, stoneType, column, row+1);
        }
  }

  for(var i=0; i< Constants.GAME_FIELD_COLUMN_COUNT; i++)
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
    this.steps += this.desroyCombo*1;

    for(var destroyList of destroyLists){
      for( var elem of destroyList){
        this.scene.addDestroyAnimation(getCellX(elem.column), getCellY(elem.row));
      }
      this.steps += this.desroyCombo*Math.min(1, Math.floor(destroyList.length/4));
      this.score += Math.round(Math.sqrt(this.desroyCombo)*destroyList.length);
    }
    setTimeout( ()=>{
      for(var destroyList of destroyLists){
        for( var elem of destroyList){
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
  var fallSpeed = Constants.FALL_ACCELERATION * this.fallingTime;
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
