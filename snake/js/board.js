;(function () {
  "use strict";
  if ( typeof Snake === "undefined" ) {
    window.Snake = {};
  }

  var DIMY = 20, DIMX = 20;

  var Board = Snake.Board = function (dimY, dimX) {
    this.dimY = dimY || DIMY;
    this.dimX = dimX || DIMX;
    this.board = this.setupBoard(this.dimY, this.dimX);
    this.snake = new Snake.Snake([Math.round(this.dimY / 2), Math.round(this.dimX / 2)]);
    this.addApple();
  };

  Board.prototype.addApple = function () {
    var needApple = true;
    while (needApple) {
      var pos = this.randomPos();
      var y = pos[0], x = pos[1];
      if (this.board[y][x] !== "S") {
        this.board[y][x] = "A";
        needApple = false;
      }
    }
  };

  Board.prototype.getMove = function () {
    var frontPos = this.snake.segments[0].pos();
    var newCoord = new Snake.Coord(frontPos);
    newCoord.plus(this.snake.dir, [this.dimY, this.dimX]);

    var deadSnake = false;
    this.snake.segments.forEach(function (coord) {
      if (coord.equals(newCoord.pos())) {
        deadSnake = true;
      }
    });

    if (deadSnake) {
      return -1;
    }
    
    var new_pos = newCoord.pos();
    var new_y = new_pos[0];
    var new_x = new_pos[1];
    if (this.board[new_y][new_x] === "A") {
      this.snake.eat();
      this.addApple();
    }

    return newCoord;
  };

  Board.prototype.render = function () {
    var segments = this.snake.segments;

    for (var i = 0; i < this.dimY; i++) {
      for (var j = 0; j < this.dimX; j++) {

        var isSegment = false;

        segments.forEach(function (coord) {
          if (coord.equals([j, i])) {
            isSegment = true;
          }
        });

        if (isSegment) {
          this.board[j][i] = "S";
        } else {
          if (this.board[j][i] !== "A") {
            this.board[j][i] = ".";
          }
        }
      }
    }

    return this.display();
  };

  Board.prototype.display = function () {
    var boardString = "";
    this.board.forEach(function (row) {
      row.forEach(function (cell) {
        boardString += cell;
      });
    });

    return boardString;
  };

  Board.prototype.randomPos = function () {
    return [Math.floor(Math.random() * this.dimY), Math.floor(Math.random() * this.dimX)];
  };

  Board.prototype.setupBoard = function (y, x) {
    var grid = [];
    for (var i = 0; i < y; i++) {
      var row = [];
      for (var j = 0; j < x; j++) {
        row.push(".");
      }
      grid.push(row);
    }

    return grid;
  };

})();
