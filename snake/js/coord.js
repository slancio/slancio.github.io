;(function () {
  "use strict";
  if ( typeof Snake === "undefined" ) {
    window.Snake = {};
  }

  var Coord = Snake.Coord = function (pos) {
    this.y = pos[0];
    this.x = pos[1];
  };

  Coord.prototype.plus = function (vector, bounds) {
    if (bounds[0] === (this.y + vector[0])) {
      this.y = 0;
    } else if ((this.y + vector[0]) < 0) {
      this.y = (bounds[0] - 1);
    } else {
      this.y += vector[0];
    }
    if (bounds[1] === (this.x + vector[1])) {
      this.x = 0;
    } else if ((this.x + vector[1]) < 0) {
      this.x = (bounds[1] - 1);
    } else {
      this.x += vector[1];
    }

    return this;
  };

  Coord.prototype.equals = function (pos) {
    return ((this.y === pos[0]) && (this.x === pos[1]));
  };

  Coord.prototype.pos = function () {
    return [this.y, this.x];
  };

})();
