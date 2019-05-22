$(document).ready(function() {
  var first = "";
  var second = "";
  var cr = 0;
  var cc = 0;
  var fsrc = "";
  var ssrc = "";
  var fr = 0;
  var fc = 0;
  var sr = 0;
  var sc = 0;
  var moves = 0;
  var timeTaken = 45;
  var solved = 0;
  var x = "";
  var cur = "";
  $('#moves-value').text(moves);
  $('#time-value').text(timeTaken);
  $('#solved-value').text(solved);
  $('#board').hide();
  $('#final-score').hide();
  var order = [];
  for(var i = 1; i <= 6; i++) {
    order.push(i);
    order.push(i);
  }
  for(var i = order.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = order[i];
    order[i] = order[j];
    order[j] = temp;
  }
  $('.place').each(function(index) {
    $(this).html(`<img src="Images/${order[index]}.png" class="card">`);
  });
  $('.card').css('visibility', 'hidden');

  $('#start').click(function() {
    $('#instructions').hide();
    $('#board').show();
    x = setInterval(function() {
      seconds = timeTaken%60;
      minutes = Math.floor(timeTaken/60);
      $('#time-value').text(timeTaken);
      if(timeTaken == 0) {
        clearInterval(x);
        gameover();
      }
      else {
        timeTaken--;
      }
    }, 1000);
  });

  $('#board').on('click', '.place', function() {
    cr = Number(this.id[2]);
    cc = Number(this.id[4]);
    moves++;
    $('#moves-value').text(moves);
    if(fr == 0 && fc == 0) {
      fr = cr;
      fc = cc;
      first = $(`#m-${fr}-${fc}`);
      first.css('background-color', 'fuchsia');
      first.find('img').css('visibility', 'visible');
      first.addClass('show-it')
      .on('animationend', function() {
        first.off('animationend');
        first.removeClass('show-it');
      });
      fsrc = first.find('img').attr('src');
    }
    else if(cr != fr || cc != fc) {
      sr = cr;
      sc = cc;
      second = $(`#m-${sr}-${sc}`);
      second.css('background-color', 'fuchsia');
      second.find('img').css('visibility', 'visible');
      second.addClass('show-it');
      ssrc = second.find('.card').attr('src');
      if(fsrc == ssrc) {
        second.on('animationend', function() {
          second.off('animationend');
          second.removeClass('show-it');
          solved++;
          $('#solved-value').text(solved);
          $("#solved").addClass("shake")
          .on('animationend', function() {
            $('#solved').off('animationend');
            $("#solved").removeClass("shake");
            $('.place').css('background-color', 'wheat');
            if(solved == 6) {
              clearInterval(x);
              gameover();
            }
          });
        });
        first.find('img').addClass('done').removeClass('card');
        first.css({'pointer-events': 'none', 'opacity': '0.75'});
        second.find('img').addClass('done').removeClass('card');
        second.css({'pointer-events': 'none', 'opacity': '0.75'});
      }
      else {
        second.on('animationend', function() {
          second.off('animationend');
          second.removeClass('show-it');
          first.add(second).addClass('hide-it')
          .on('animationend', function() {
            first.add(second).off('animationend');
            first.add(second).removeClass('hide-it')
            .find('.card').css('visibility', 'hidden');
            $('.place').css('background-color', 'wheat');
          });
        });
      }
      fr = 0;
      fc = 0;
      sr = 0;
      sc = 0;
    }
  });

  function gameover() {
    var result = "";
    if(solved == 6) {
      result = "YOU ARE A GENIUS!!!";
    }
    else if(solved == 5) {
      result = "YOU ARE INTELLIGENT!!";
    }
    else if(solved == 4) {
      result = "YOU ARE SMART!";
    }
    else if(solved <= 3) {
      result = "YOU NEED MORE PRACTICE...";
    }
    $('#final-score').text(result);
    $('#final-score').show();
    $('.place').css('pointer-events', 'none');
  }
});
