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
    this.score = 0;
    this.bonusScore = 0;
  };

  Lizard.prototype.move = function (newCoord) {
    this.segments.unshift(newCoord);
    this.increaseScore();
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

  Lizard.prototype.increaseScore = function () {
    if (this.hasEaten) {
      this.score += this.bonusScore;
      this.bonusScore = 30 * (this.segments.length - 1);
    } else {
      if (this.bonusScore > 0) {
        var pointBleed = (3 * Math.round(this.segments.length / 3));
        if ((this.bonusScore - pointBleed) <= 0) {
          this.bonusScore = 0;
        } else {
          this.bonusScore -= pointBleed;
        }
      }

      this.score += (30 + this.segments.length);
    }
  };


})();
