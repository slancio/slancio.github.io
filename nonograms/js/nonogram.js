;(function () {
  "use strict";
  if ( typeof Nonogram === "undefined" ) {
    window.Nonogram = {};
  }

  var SIZE_10 = [
   [[0,4],[0,5],[0,6],[0,7],[1,2],[1,3],[1,8],[2,0],[2,1],[2,9],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9],[4,0],[4,9],[5,1],[5,4],[5,6],[5,7],[5,9],[6,1],[6,6],[6,7],[6,9],[7,0],[7,2],[7,9],[8,0],[8,9],[9,0],[9,1],[9,2],[9,3],[9,4],[9,5],[9,6],[9,7],[9,8],[9,9]],
   [[0,2],[0,3],[0,4],[0,6],[0,7],[1,1],[1,5],[1,8],[2,0],[2,8],[3,0],[3,2],[3,3],[3,5],[3,7],[3,8],[4,0],[4,2],[4,4],[4,6],[4,7],[4,9],[5,0],[5,1],[5,7],[5,9],[6,1],[6,5],[6,7],[6,9],[7,1],[7,2],[7,7],[7,8],[8,1],[8,4],[8,7],[9,2],[9,3],[9,4],[9,5],[9,6]],
   [[0,7],[1,6],[1,8],[2,6],[2,7],[2,8],[3,6],[3,8],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,9],[5,0],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9],[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,8],[6,9],[7,1],[7,2],[7,3],[7,5],[7,8],[7,8],[8,2],[8,5],[8,8],[8,9],[9,1],[9,2],[9,3],[9,5],[9,6],[9,7],[9,8],[9,9]]
  ];	

  var Pictogram = Nonogram.Nonogram = function (size) {
    if (size === 10) {
      this.puzzle = SIZE_10[Math.floor(Math.random() * SIZE_10.length)];
    }
    this.pixels = [];
    this.puzzle.forEach( function (pos) {
      this.pixels.push(new Nonogram.Coord(pos));
    }.bind(this));
    this.topHint = this.setTopHint(size);
    this.leftHint = this.setLeftHint(size);
  };

  Pictogram.prototype.setTopHint = function (size) {
    var hint = [];

    for (var i = 0; i < size; i++) {
      var col = [];

      this.puzzle.forEach( function (pos) {
        if (pos[1] === i) {
          col.push(pos[0]);
        }
      });

      hint.push(this.buildHint(col.sort(), size));
    }
    
    return hint;
  };

  Pictogram.prototype.setLeftHint = function (size) {
    var hint = [];

    for (var i = 0; i < size; i++) {
      var row = [];

      this.puzzle.forEach( function (pos) {
        if (pos[0] === i) {
          row.push(pos[1]);
        }
      });

      hint.push(this.buildHint(row.sort(), size));
    }

    return hint;
  };

  Pictogram.prototype.buildHint = function (arr, size) {
    var hint = [];
    var count = 0;

    for (var i = 0; i <= size; i++) {
      if (arr.indexOf(i) > -1) {
        count += 1;
      } else if ((arr.indexOf(i) === -1) && (count > 0)) {
        hint.push(count);
        count = 0;
      }
    }

    if (hint.length === 0) {
      hint.push(0);
    }

    return hint;
  };
  
})();
