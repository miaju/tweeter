/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* eslint-disable no-undef */
$(document).ready(function() {
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweetData) {
    const timestamp = timeago.format(tweetData.created_at);

    const tweet = `
    <article class="tweet">
      <header>
        <div>
          <img src=${tweetData.user.avatars}>
          <p id="screenname"> ${tweetData.user.name} </p>
        </div>
        <p id="username">${tweetData.user.handle}</p>
      </header>
      <p>
        ${escape(tweetData.content.text)}
      </p>
      <footer>
        <p id="timestamp">${timestamp}</p>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article> 
    `;
    return tweet;
  };

  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      $("#tweets-container").prepend(createTweetElement(tweet));
    }
  };

  const loadTweets = function() {
    $.get("/tweets", function(data) {
      renderTweets(data);
    });
  };

  const $newTweet = $(".new-tweet");

  $newTweet.submit(function(event) {
    event.preventDefault();
    const chars = Number($(event.target.counter).val());
    const $alert = $(this).find(".alert");
    if (chars === 140) {
      $alert.removeClass("hidden");
      $alert.find("div").text("No tweet text entered!");
      event.stopImmediatePropagation();
    } else if (chars < 0) {
      $alert.removeClass("hidden");
      $alert.find("div").text("Tweet over 140 characters!");
      event.stopImmediatePropagation();
    } else {
      $alert.addClass("hidden");
      const serialized = $(event.target).serialize();
      $.post("/tweets", serialized, (res) => {
        $(event.target).parent().find("#tweet-text").val("");
        $(event.target.counter).val("140");
        loadTweets();
      });
    }
  });

  loadTweets();
});
