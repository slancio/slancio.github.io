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

    this.mouseActive  = false;   // Used to track whether a mouse is being dragged over multiple cells
    this.lastAction   = 'pixel'; // What to switch each dragged cell to when being dragged over
    this.lastPosition = [0,0];   // Set default starting position for key navigation
  };

  View.prototype.handleClickEvent = function () {
    var that = this;

    $('.board').on('mousedown', function() {
      that.mouseActive = true;
    });

    $('.board').on('mouseup', function() {
      that.mouseActive = false;
    }).on('mouseleave', function() {
      that.mouseActive = false;
    });

    $('.cell').on('mousedown', function (event) {
      that.mouseActive = true;
      var $pixel = $(event.target);
      that.lastPosition = [$pixel.data("y"), $pixel.data("x")];
      that.updateBoard();
    });

    $('.cell').on('mouseup', function() {
      that.mouseActive = false;
    });

    $('.cell').on('mouseenter', function (event) {
      var $pixel = $(event.target);
      that.lastPosition = [$pixel.data("y"), $pixel.data("x")];
      that.render();
      if (that.mouseActive) {
        that.updateBoard(that.lastAction);
      }
    });

    $('li.hint').on('click', function() {
      $(this).toggleClass('checked');
    });

    $('.clear-blocks').on('click', function (event) {
      event.preventDefault();
      that.resetBlocks();
    });

    $('.start-over').on('click', function (event) {
      event.preventDefault();
      that.resetBoard();
    });

    $('.new-game').on('click', function (event) {
      event.preventDefault();
      location.reload();
    });

    $('.how-to').on('click', function (event) {
      event.preventDefault();
      var $howTo = $('.how-to-text');
      if ($howTo.hasClass('hide')) {
        $howTo.removeClass('hide');
        $('.board').addClass('hide');
        $('.board-resets').addClass('hide');
        $('.how-to').text('Back To Game');
      } else {
        $howTo.addClass('hide');
        $('.board').removeClass('hide');
        $('.board-resets').removeClass('hide');
        $('.how-to').text('How To Play');
      }
    });
  };

  View.prototype.handleKeyEvent = function () {
    $(document).keyup(function (event) {
      switch(event.which) {
        case 87:    //w
        case 73:    //i
        case 38:    //up arrow
          if (this.lastPosition[0] !== 0) {
            this.lastPosition[0] -= 1;
            this.render();
          }
        break;
        case 65:    //a
        case 74:    //j
        case 37:    //left arrow
          if (this.lastPosition[1] !== 0) {
            this.lastPosition[1] -= 1;
            this.render();
          }
        break;
        case 83:    //s
        case 75:    //k
        case 40:    //down arrow
          if (this.lastPosition[0] !== (this.board.size - 1)) {
            this.lastPosition[0] += 1;
            this.render();
          }
        break;
        case 68:    //d
        case 76:    //l
        case 39:    //right arrow
          if (this.lastPosition[1] !== (this.board.size - 1 )) {
            this.lastPosition[1] += 1;
            this.render();
          }
        break;
        case 90:    //z
        case 66:    //b
          this.updateBoard('pixel');    //draw pixel
        break;
        case 88:    //x
        case 78:    //n
          this.updateBoard('block');    //draw block
        break;
        case 67:    //c
        case 77:    //m
          this.updateBoard('');    //clear cell
        break;
        case 32:    //space
        case 13:    //enter
          this.updateBoard();    //simply toggle
        break;
        default:
          return;
      }
    }.bind(this));
  };

  View.prototype.updateBoard = function (type) {
    if (typeof type === 'undefined') {
      this.lastAction = this.board.toggle(this.lastPosition);
    } else {
      this.lastAction = this.board.draw(this.lastPosition, type);
    }
    this.render();
    if (this.board.checkWinState()) {
      this.winBoard();
    }
  };

  View.prototype.setupBoard = function () {
    for (var i = 0; i < this.board.dimX; i++) {
      var $th = $("<th></th>");
      var $hints = $("<ul></ul>");

      this.solution.topHint[i].forEach( function (hint) {
        var $hintItem = $("<li></li>");
        $hintItem.addClass('hint').text(hint);
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
        $hintItem.addClass('hint').text(hint);
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
    this.handleKeyEvent();
    this.render();
  };

  View.prototype.winBoard = function () {
    this.resetBlocks();
    this.render();

    // Prevent additional interactions with the game since it has already been completed
    $('.cell').off('mouseup').off('mousedown').off('mouseenter').off('click');
    $('.how-to').off('click');
    $('.board-resets').empty();
    $(document).unbind('keyup');

    $('.board-head').addClass('win-state');
    $('.cell').addClass('win-state').removeClass('highlight');
    $('.hint').addClass('win-state');
    $('body').append('<h1 class="win-state">You Win!</h1>')
             .append('<form class="new-game win-state"><button>New game?</button></form>');
    $('.new-game').click( function (event) {
      event.preventDefault();
      location.reload();
    });
  };

  View.prototype.resetBoard = function () {
    this.board.clearBoard();
    this.mouseActive  = false;
    this.lastAction   = 'pixel';
    this.lastPosition = [0,0];
    this.render();
  };

  View.prototype.resetBlocks = function () {
    this.board.clearBlocks();
    this.render();
  };

  View.prototype.render = function () {
    $('.cell').removeClass("pixel block highlight");
    $('.cell[data-x="' + this.lastPosition[1] + '"][data-y="' + this.lastPosition[0] + '"]').addClass('highlight');
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
