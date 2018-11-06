"use strict"
import {Constants} from "../Constants"

const STATUS_WAITING = 0;
const STATUS_SWAPPING = 1;
const STATUS_DESTROYING = 2;
const STATUS_FALLING = 3;

export var GameLogic = function(scene){
  this.scene = scene;
  this.status = STATUS_WAITING;
  this.selectedCell = null;
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

}

GameLogic.prototype.onClick = function(location){
  if(this.status != STATUS_WAITING) return;
  var clickRow = getRow(location.y);
  var clickColumn = getColumn(location.x);
  var hasStoneClicked = (clickColumn >= 0 && clickColumn < this.cup.length &&
      clickRow>=0 && clickRow < this.cup[clickColumn].length &&
      this.cup[clickColumn][clickRow] != null);
  if(this.selectedCell && hasStoneClicked &&
      Math.abs(this.selectedCell.row - clickRow) +
      Math.abs(this.selectedCell.column - clickColumn) == 1){
        this.status = STATUS_SWAPPING;
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
  for(var i = 0; i< Constants.GAME_FIELD_COLUMN_COUNT; i++){
    checkedFlags[i] = new Array(this.cup[i].length);
  }
  var findDestroyable = (sameList, stoneType, column, row)=>{
    if(!checkedFlags[column][row] && this.cup[column][row] &&
        this.cup[column][row].type == stoneType){
          sameList.push({column:column, row:row});
          checkedFlags[column][row] = true;
          if(column > 0) findDestroyable(sameList, stoneType, column-1, row);
          if(column < Constants.GAME_FIELD_COLUMN_COUNT -1){
            findDestroyable(sameList, stoneType, column+1, row);
          }
          if(row > 0) findDestroyable(sameList, stoneType, column, row-1);
          if(row < this.cup[column].length-1)findDestroyable(sameList, stoneType, column, row+1);
        }
  }

  for(var i=0; i< Constants.GAME_FIELD_COLUMN_COUNT; i++)
    for (var j = 0; j< this.cup[i].length; j++)
      if(this.cup[i][j]){
        var list = [];
        findDestroyable(list,this.cup[i][j].type, i,j);
        if(list.length>3){
          destroyLists.push(list);
        }
      }

    if(destroyLists.length == 0){
      this.status = STATUS_WAITING;
      return;
    }
    for(var destroyList of destroyLists){
      for( var elem of destroyList){
        this.scene.addDestroyAnimation(getCellX(elem.column), getCellY(elem.row));
      }
    }
    setTimeout( ()=>{
      for(var destroyList of destroyLists){
        for( var elem of destroyList){
          this.cup[elem.column][elem.row].removeFromParent();
          this.cup[elem.column][elem.row] = null;
        }
      }
      this.status = STATUS_FALLING;
    }, 500);
    console.log(destroyLists);
}
