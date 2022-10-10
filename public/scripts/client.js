/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* eslint-disable no-undef */
$(document).ready(function() {
  
  const createTweetElement = function(tweetData) {

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
        ${tweetData.content.text}
      </p>
      <footer>
        <p id="timestamp">${tweetData.created_at}</p>
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
    for (const tweet of tweets) {
      $('#tweets-container').append(createTweetElement(tweet));
    }
  };
  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  
  renderTweets(data);
  
});


