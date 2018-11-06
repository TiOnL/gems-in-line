"use strict"
import {Constants} from "../Constants"


export var GameLogic = function(scene){
  this.scene = scene;
  this.status = ""
  this.cup = new Array(Constants.GAME_FIELD_COLUMN_COUNT);
  for(var i=0; i < Constants.GAME_FIELD_COLUMN_COUNT; i++){
    this.cup[i] = new Array();
  }
};

function getCellX(column){
  return 128+128*column;
}

function getCellY(row){
  return 128+128*row;
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
