;(function () {
  "use strict";
  if ( typeof Snake === "undefined" ) {
    window.Snake = {};
  }

  var DIRS = {"N": [-1, 0], "E": [0, 1], "S": [1, 0], "W": [0, -1]};
  var OPP_DIRS = {"N": [1, 0], "E": [0, -1], "S": [-1, 0], "W": [0, 1]};

  var Lizard = Snake.Snake = function (pos) {
    this.dir = DIRS["E"];
    this.segments = [new Snake.Coord(pos)];
    this.hasEaten = false;
  };

  Lizard.prototype.move = function (newCoord) {
    this.segments.unshift(newCoord);
    if (this.hasEaten) {
      this.hasEaten = false;
    } else {
      this.segments.pop();
    }
  };

  Lizard.prototype.turn = function (dir) {
    if ((this.dir[0] !== OPP_DIRS[dir][0]) && (this.dir[1] !== OPP_DIRS[dir][1])) {
      this.dir = DIRS[dir];
    }
  };

  Lizard.prototype.eat = function () {
    this.hasEaten = true;
  };


})();
