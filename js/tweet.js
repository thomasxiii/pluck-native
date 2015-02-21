'use strict';

define([
  'jquery',
  'angular',
  'twitter'
], function($, angular, twitter) {

  var MIN_WIDTH = 200;
  var MAX_WIDTH = 600;
  // var MIN_FONT_SIZE = 10;
  // var MAX_FONT_SIZE = 22;
  var MIN_FONT_SIZE = 2;
  var MAX_FONT_SIZE = 5;
  var MAX_SCORE = 250;
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var MIN_HUE = 212;
  var MAX_HUE = 212;
  var MIN_SATURATION = 70;
  var MAX_SATURATION = 100;
  var MIN_OPACITY = 0;
  var MAX_OPACITY = 1;

  return angular.module('tweet', [])
    .controller('TweetController', [
      '$scope',
      '$rootScope',
      '$compile',
      '$element',
      function($scope, $rootScope, $compile, $element) {

        $scope.setScore = function() {
          $scope.tweet.score = $scope.tweet.favorite_count + $scope.tweet.retweet_count;
          $scope.tweet.handicappedScore = $scope.tweet.score / $scope.handicap;
        };

        $scope.setDate = function() {
          $scope.time = $scope.tweet.id;
          var tweetDate = new Date($scope.tweet.created_at);
          $scope.displayDate = MONTHS[tweetDate.getMonth()] + ' ' + tweetDate.getDate() +
            ' @ ' + tweetDate.getHours() + ':' + tweetDate.getMinutes();
        }

        $scope.setStyles = function() {
          var scorePer = Math.min($scope.tweet.handicappedScore / MAX_SCORE, 1);

          var fontSize = MIN_FONT_SIZE + (scorePer * (MAX_FONT_SIZE - MIN_FONT_SIZE));
          var fontFamily = 'AvenirNext-Regular';

          if (scorePer >= .33 && scorePer < .66) {
            fontFamily = 'AvenirNext-Bold';
          } else if (scorePer >= .66) {
            fontFamily = 'AvenirNext-Heavy';
          }

          $scope.$tweetText.css({
            fontSize: fontSize + 'vw',
            fontFamily: fontFamily
          });

          // var hue = MIN_HUE + (scorePer * (MAX_HUE - MIN_HUE));
          // var saturation = MIN_SATURATION + (scorePer * (MAX_SATURATION - MIN_SATURATION));
          // var opacity = MIN_OPACITY + (scorePer * (MAX_OPACITY - MIN_OPACITY));
          // var color = 'hsla(' + hue + ', ' + saturation + '%, 65%, ' + opacity + ')';

          // $element.css({
          //   borderColor: color
          // });
        };

        $scope.setText = function() {
          var text = $scope.tweet.text;

          if ($scope.tweet.retweeted_status) {
            text = $scope.tweet.retweeted_status.text;
          }

          var i;

          var urls = $scope.tweet.entities.urls || [];
          var media = $scope.tweet.entities.media || [];

          for (i = 0; i < urls.length; i++) {
            var url = $scope.tweet.entities.urls[i];
            var link = '<a href="' + url.expanded_url + '">' + url.url + '</a>';
            text = text.replace(url.url, link);
          }

          for (i = 0; i < media.length; i++) {
            var url = $scope.tweet.entities.media[i];
            var link = '<a href="' + url.expanded_url + '">' + url.url + '</a>';
            text = text.replace(url.url, link);
          }

          $scope.$tweetText.html(text);
        };

        $scope.setMedia = function() {
          // var media = $scope.tweet.entities.media && $scope.tweet.entities.media[0];
          // if (media) {
          //   $element.css({
          //     'background-image': 'url(' + media.media_url + ')',
          //     'background-size': 'cover'
          //   });
          // }
        };

        $scope.setHandicap = function() {
          // var followers = $scope.tweet.user.followers_count;
          // $scope.handicap = Math.max(followers / 100000, 1);

          $scope.handicap = 1;
        };

        $scope.adjustHandicap = function(amount) {
          if (amount === 1) {
            $scope.handicap *= 2;
          } else {
            $scope.handicap /= 2;
          }

          refresh();
        };

        function refresh() {
          $scope.setScore();
          $scope.setStyles();
        }

        (function _init() {
          $scope.$tweetText = $element.find('.tweet-text');
          $scope.setHandicap();
          $scope.setScore();
          $scope.setStyles();
          $scope.setDate();
          $scope.setText();
          $scope.setMedia();
        })();

      }
    ])
    .directive('tweet', function() {
      return {
        restrict: 'E',
        controller: 'TweetController',
        templateUrl: 'templates/tweet.html',
        scope: {
          tweet: '=ngModel'
        },
        link: function(scope, element, attrs) {

        }
      };
    });

});
