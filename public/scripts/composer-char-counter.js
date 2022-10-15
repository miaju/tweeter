/* eslint-disable no-undef */

// displays the length of the text in the new tweet box, turns red if the length is over 140 chars
$(document).ready(function() {
  let chars = 0;

  $("#tweet-text").on("input", function() {
    chars = $(this).val().length;
    let charsLeft = 140 - chars;

    if (charsLeft < 0) {
      $(this).parent().find(".counter").css("color", "red");
    } else {
      $(this).parent().find(".counter").css("color", "#545149");
    }

    $(this).parent().find(".counter").html(charsLeft);
  });
});
