function GameOfLife(width,height) {
  this.width = width;
  this.height = height;
  this.paused = true;
}

GameOfLife.prototype.createAndShowBoard = function () {
  // create <table> element
  var goltable = document.createElement("tbody");
  


  // build Table HTML
  var tablehtml = '';
  for (var h=0; h<this.height; h++) {
    tablehtml += "<tr id='row+" + h + "'>";
    for (var w=0; w<this.width; w++) {
      tablehtml += "<td data-status='dead' id='" + w + "-" + h + "' class='dead'></td>";
    }
    tablehtml += "</tr>";
  }
  goltable.innerHTML = tablehtml;
  
  // add table to the #board element
  var board = document.getElementById('board');
  board.appendChild(goltable);
  
  // once html elements are added to the page, attach events to them
  this.setupBoardEvents();
};

GameOfLife.prototype.setupBoardEvents = function() {
  // each board cell has an CSS id in the format of: "x-y" 
  // where x is the x-coordinate and y the y-coordinate
  // use this fact to loop through all the ids and assign
  // them "on-click" events that allow a user to click on 
  // cells to setup the initial state of the game
  // before clicking "Step" or "Auto-Play"
  
  // clicking on a cell should toggle the cell between "alive" & "dead"
  // for ex: an "alive" cell be colored "blue", a dead cell could stay white
  
  // EXAMPLE FOR ONE CELL
  // Here is how we would catch a click event on just the 0-0 cell
  // You need to add the click event on EVERY cell on the board




var pulsar =  "!Name: Pulsar \n" +
              "!Author: John Conway \n" +
              "!Despite its size, this is the fourth most common oscillator (and by far the most common of period greater than 2). \n" +
              "!www.conwaylife.com/wiki/index.php?title=Pulsar \n" +
              "..OOO...OOO \n" +
              "O....O.O....O \n" +
              "O....O.O....O \n" +
              "  O....O.O....O \n" +
              "..OOO...OOO \n" +
              "..OOO...OOO \n" +
              "O....O.O....O \n" +
              "O....O.O....O \n" +
              "O....O.O....O \n" +
              "..OOO...OOO\n";


var gliderGun = "!Name: Gosper glider gun\n" +
"!Author: Bill Gosper\n" +
"!The first known gun and the first known finite pattern with unbounded \n" +
"!www.conwaylife.com/wiki/index.php?title=Gosper_glider_gun\n" +
"........................O\n" +
"......................O.O\n" +
"............OO......OO............OO\n" +
"...........O...O....OO............OO\n" +
"OO........O.....O...OO\n" +
"OO........O...O.OO....O.O\n" +
"..........O.....O.......O\n" +
"...........O...O\n" +
"............OO\n";











var beacon ="!Name: 1 beacon \n" +
             "!Approximately the 32nd-most common oscillator. \n" +
             "!www.conwaylife.com/wiki/index.php?title=1_beacon \n" +
             "..OO \n" +
             ".O.O \n" +
             "O..O.OO \n" +
             "OO.O..O \n" +
             ".O.O \n" +
             ".O..O \n" +
              "..OO";

  var gol = this;

var beaconParser = function(beacon) {
    var startHeight = Math.floor(gol.height/3);
    var startWidth = Math.floor(gol.width/3);
    var splittedArrayBeacon = beacon.split('\n');
    splittedArrayBeacon.forEach(function(element, index, array) {
      element.trim();
      if (element[0] != "!"){
        for (var i = 0; i < element.length; i++){
          var cell = document.getElementById((startWidth+i) + "-" + (startHeight + index));
          if (element[i] === "."){
            setDeadAlive(cell, "dead");
          } else {
            setDeadAlive(cell, "alive");
          }
        }
      } 

    });

};


  var beaconButton = document.getElementById('btn-beacon');
    beaconButton.onclick = function(e){
    beaconParser(beacon);
  };

  var gliderButton = document.getElementById('btn-glider');
    gliderButton.onclick = function(e){
    beaconParser(gliderGun);
  };

  var pulsarButton = document.getElementById('btn-pulsar');
    pulsarButton.onclick = function(e){
    beaconParser(pulsar);
  };






  setInterval(function(){if (!gol.paused) {gol.step()}}, 10);

  var play = document.getElementById('btn-play');
  play.onclick = function (e) {
    gol.paused = false;
    
  }

  var pause = document.getElementById('btn-pause');
  pause.onclick = function (e) {
    gol.paused = true;
  } 



  var onCellClick = function (e) {
    // coordinates of cell, in case you need them
    var coord_array = this.id.split('-');
    var coord_hash = {x: coord_array[0], y: coord_array[1]};
    // how to set the style of the cell when it's clicked
    if (this.getAttribute('data-status') == 'dead') {
      setDeadAlive(this, "alive");
    } else {
      setDeadAlive(this, "dead");
    }
  };
  

  var cellArray = document.getElementsByClassName('dead');
  for (var i = 0; i < cellArray.length ; i++) {
    cellArray[i].onclick = onCellClick;
  }

  var clearButton = document.getElementById('btn-clear');
  clearButton.onclick = function(e) {
      gol.paused = true;
      var cellArray = document.getElementsByClassName('alive');

      while (cellArray.length) {
        setDeadAlive(cellArray[0], "dead");
      }
  };

  var resetRandom = document.getElementById('btn-reset-random');
 
  var height = this.height;
  var width = this.width;

  resetRandom.onclick = function(e) {
    gol.paused = true;
    for (var h=0; h < height ; h++ ) {
      for (var w=0 ; w< width ; w++ ){
        var cell = document.getElementById(w +"-"+ h );
        if (Math.floor((Math.random() * 2))) {
          setDeadAlive(cell, "dead");
      } else {
        setDeadAlive(cell, "alive");
      }
    }
  }
};

  var stepButton = document.getElementById('btn-step');
  
  stepButton.onclick = function() { 
    gol.step();
  };

 // cell00.onclick = onCellClick;
};

function setDeadAlive(el, status) {
  el.setAttribute('data-status', status);
  el.className = status;
}

function getNeighbors(el) {
  var coordinates = el.id.split('-');
  var h = Number(coordinates[1]), w = Number(coordinates[0]);
  var ret_arr = [];
  for(var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      if (i == 0 && j == 0) continue;
      var cell = document.getElementById((w+j) + "-" + (h+i));
      if (cell) ret_arr.push(cell);
    }
  }
  return ret_arr;
}

function liveNeighbors(el) {
  var neighbors = getNeighbors(el);
  var count = 0;
  for (var i = 0; i < neighbors.length; i++) {
    if (neighbors[i].className == 'alive') count++;
  }
  return count;
}

GameOfLife.prototype.step = function () {
  // Here is where you want to loop through all the cells
  // on the board and determine, based on it's neighbors,
  // whether the cell should be dead or alive in the next
  // evolution of the game
  var h = this.height, w = this.width;
  var neighbors = {};

  for (var i = 0; i < h; i++) {
    for (var j = 0; j < w; j++) {
      var id = j + "-" + i;
      var cell = document.getElementById(id);
      var n = liveNeighbors(cell);
      neighbors[id] = n;    
    }
  }

  for (var i = 0; i < h; i++) {
    for (var j = 0; j < w; j++) {

      // Live cell w/ 2-3 live neighbors, do nothing
      // Live cell w/ <2 live neighbors, die
      // Live cell w/ >3 live neighbors, die
      // Dead cell w/ 3 live neighbors, reproduction
      var id = j +"-"+ i;
      var cell = document.getElementById(id);
      var n = neighbors[id];
      var alive = (cell.className == "alive");
      if (alive) {
        if ((n == 2) || (n == 3)) continue;
        else setDeadAlive(cell, "dead");
      } else {
        if (n == 3) setDeadAlive(cell, "alive");
      }
      
    }
  }



  
};

GameOfLife.prototype.enableAutoPlay = function () {


  // Start Auto-Play by running the 'step' function
  // automatically repeatedly every fixed time interval
  
};


var gol = new GameOfLife(100,100);
gol.createAndShowBoard();
