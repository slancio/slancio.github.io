;(function () {
  "use strict";
  if ( typeof Nonogram === "undefined" ) {
    window.Nonogram = {};
  }

  var SIZE = 10;

  var Board = Nonogram.Board = function(size) {
    this.size = size || SIZE;
    this.solution = new Nonogram.Nonogram(this.size);
    this.dimX = this.size;
    this.dimY = this.size;
    this.pixels = [];
    this.blocks = [];
  };

  Board.prototype.checkWinState = function (el) {
    var boardPixelPositions = [];
    this.pixels.forEach( function (pixel) {
      boardPixelPositions.push(pixel.pos());
    });
    var solutionPixelPositions = [];
    this.solution.pixels.forEach( function (pixel) {
      solutionPixelPositions.push(pixel.pos());
    });

    var compareGameArrays = function (board, solution) {
      return _.isEqual(board.sort(), solution.sort());
    };

    return compareGameArrays(boardPixelPositions, solutionPixelPositions);
  };

  Board.prototype.toggle = function (pos) {
    if (this.isPixel(pos)) {
      this.removePixel(pos);
      this.addBlock(pos);
      return 'block';
    } else if (this.isBlock(pos)) {
      this.removeBlock(pos);
      return '';
    } else {
      this.addPixel(pos);
      return 'pixel';
    }
  };

  Board.prototype.draw = function (pos, type) {
    this.removePixel(pos);
    this.removeBlock(pos);
    switch(type) {
      case 'block':
        this.addBlock(pos);
      break;
      case 'pixel':
        this.addPixel(pos);
      break;
      default:
        return '';
    }

    return type;
  };

  Board.prototype.clearBoard = function () {
    this.clearBlocks();
    this.clearPixels();
  };

  Board.prototype.clearBlocks = function () {
    this.blocks = [];
  };

  Board.prototype.clearPixels = function () {
    this.pixels = [];
  };

  Board.prototype.addPixel = function (pos) {
    this.pixels.push(new Nonogram.Coord([pos[0], pos[1]]));
  };

  Board.prototype.addBlock = function (pos) {
    this.blocks.push(new Nonogram.Coord([pos[0], pos[1]]));
  };

  Board.prototype.removePixel = function (pos) {
    this.pixels.forEach( function (coord, index, pixels) {
      if (coord.equals(pos)) {
        pixels.splice(index, 1);
      }
    });
  };

  Board.prototype.removeBlock = function (pos) {
    this.blocks.forEach( function (coord, index, blocks) {
      if (coord.equals(pos)) {
        blocks.splice(index, 1);
      }
    });
  };

  Board.prototype.isPixel = function (pos) {
    var question = false;
    this.pixels.forEach( function (coord) {
      if (coord.equals(pos)) {
        question = true;
      }
    });
    return question;
  };

  Board.prototype.isBlock = function (pos) {
    var question = false;
    this.blocks.forEach( function (coord) {
      if (coord.equals(pos)) {
        question = true;
      }
    });
    return question;
  };

  Board.prototype.render = function () {
    var boardString = "";
    
    for (var i = 0; i < this.dimY; i++) {
      var rowString = "";

      for (var j = 0; k < this.dimX; j++) {

        if (this.isPixel([j,i])) {
          rowString += "+";
        } else if (this.isBlock([j,i])) {
          rowString += "x";
        } else {
          rowString += ".";
        }

      }
      boardString += rowString;
    }

    return boardString;
  };

})();
