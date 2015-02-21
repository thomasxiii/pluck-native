'use strict';

define([], function() {

  var module = {};

  var PAGES = 1;
  var NUM_TWEETS = 200;

  module.Twitter = require('twitter');

  module.client = new module.Twitter({
    consumer_key: 'qvqgW5ds39Aj2KbBU1oBL26dZ',
    consumer_secret: 'AHvZ44obybRHYvqcmSMrMxg7kr9mqpbhQvn6eb3ye1jISOKbie',
    access_token_key: '30870167-mIyTd6yzgPzhncbmqBQlARfRGEpWrpgURusQ5aCkA',
    access_token_secret: 'XwFJ2pRMNaSPHTnUDTxB0hBa9R9j2vMEJGCdDpO6oUXdY'
  });

  module.getTimeline = function(pages, callback) {
    pages = pages || PAGES;

    var currentPage = 0;
    var tweets = [];

    var tweetCallback = function(error, data, response) {
      if (error) {
        callback(data, error);
        return;
      }

      currentPage++;

      // add the tweets
      tweets = tweets.concat(data);

      if (currentPage === pages) {
        callback(tweets);
      } else {
        getTweets(tweetCallback, tweets[tweets.length - 1].id);
      }
    };

    getTweets(tweetCallback);

    // module.client.get('statuses/home_timeline', {
    //   count: 200
    // }, function(error, data, response) {
    //   if (!error) {
    //     currentPage++;

    //     tweets = tweets.concat(data);

    //     if (currentPage === pages) {
    //       callback(tweets);
    //     } else {

    //     }
    //   }
    // });
  };

  function getTweets(callback, id) {
    module.client.get('statuses/home_timeline', {
      count: NUM_TWEETS,
      max_id: id
    }, callback);
  }

  module.startStream = function(tweetHandler, errorHandler) {
    module.client.stream('user', {}, function(stream) {
      stream.on('data', tweetHandler);
      stream.on('error', errorHandler);
    });
  };

  module.getProfile = function(callback) {
    module.client.get('users/show', {
      screen_name: 'attasi'
    }, callback);
  };

  // var params = {screen_name: 'attasi'};
  // client.get('statuses/user_timeline', params, function(error, tweets, response){
  //   if (!error) {
  //     console.log(tweets);
  //   }
  // });

  // var params = {screen_name: 'attasi'};
  // client.get('users/show', params, function(error, data, response){
  //   if (!error) {
  //     console.log(data);
  //     console.log(data.profile_image_url);

  //     $('body').append('<img src="' + data.profile_image_url + '">');
  //   }
  // });

  // client.stream('statuses/home_timeline', {
  //   count: 200
  // }, function(stream) {

  //   stream.on('data', function(tweet) {
  //     console.log(tweet.text);
  //   });

  //   stream.on('error', function(error) {
  //     throw error;
  //   });

  // });


  return module;

});
