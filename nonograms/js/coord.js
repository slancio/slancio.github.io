;(function () {
  "use strict";
  if ( typeof Nonogram === "undefined" ) {
    window.Nonogram = {};
  }

  var Coord = Nonogram.Coord = function (pos) {
    this.x = pos[0];
    this.y = pos[1];
  };

  Coord.prototype.equals = function (pos) {
   return ((this.x === pos[0]) && (this.y === pos[1]));
  };

  Coord.prototype.pos = function () {
    return [this.x, this.y];
  };

})();
