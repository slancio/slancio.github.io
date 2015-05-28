;(function () {
  "use strict";
  if ( typeof Nonogram === "undefined" ) {
    window.Nonogram = {};
  }

  var View = Nonogram.View = function (board, $el) {
    this.board = board;
    this.solution = board.solution;
    this.$head = $el.find('.board-head');
    this.$body = $el.find('.board-body');
  };

  View.prototype.handleClickEvent = function () {
    var that = this;
    $('.cell').click( function (event) {
      var $pixel = $(event.target);
      var pos = [$pixel.data("y"), $pixel.data("x")];
      that.board.toggle(pos);
      that.render();
      if (that.board.checkWinState()) {
        that.winBoard();
      }
    });
  };

  View.prototype.setupBoard = function () {
    for (var i = 0; i < this.board.dimX; i++) {
      var $th = $("<th></th>");
      var $hints = $("<ul></ul>");

      this.solution.topHint[i].forEach( function (hint) {
        var $hintItem = $("<li></li>");
        $hintItem.addClass('hint').html('<strong>' + hint + '</strong>');
        $hints.append($hintItem);
      });

      $th.html($hints);
      this.$head.append($th);
    }

    for (var i = 0; i < this.board.dimY; i++) {
      var $tr = $("<tr></tr>");
      var $hints = $("<ul></ul>");

      this.solution.leftHint[i].forEach( function (hint) {
        var $hintItem = $("<li></li>");
        $hintItem.addClass('hint').html('<strong>' + hint + '</strong>');
        $hints.append($hintItem);
      });

      var $td = $('<td></td>');
      $td.html($hints);
      $tr.append($td);

      for (var j = 0; j < this.board.dimX; j++) {
        var $td = $('<td class="cell"></td>');
        $tr.append($td.attr("data-x", j).attr("data-y", i));
      }

      this.$body.append($tr);
    }

    this.handleClickEvent();
  };

  View.prototype.winBoard = function () {
    this.board.blocks = [];
    this.render();
    $('.board-head').addClass('win-state');
    $('.cell').addClass('win-state');
    $('.hint').addClass('win-state');
    $('body').append('<h1 class="win-state">You Win!</h1>')
             .append('<form class="new-game win-state"><button>Play again?</button></form>');
    $('.new-game').click( function (event) {
      event.preventDefault();
      location.reload();
    });
  };


  View.prototype.render = function () {
    $('.cell').removeClass("pixel block");
    this.board.pixels.forEach( function (coord) {
      var pos = coord.pos();
      $('.cell[data-x="' + pos[1] + '"][data-y="' + pos[0] + '"]').addClass('pixel');
    });
    this.board.blocks.forEach( function (coord) {
      var pos = coord.pos();
      $('.cell[data-x="' + pos[1] + '"][data-y="' + pos[0] + '"]').addClass('block');
    });
  };

})();