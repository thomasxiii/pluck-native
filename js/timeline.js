'use strict';

define([
  'jquery',
  'angular',
  'isotope',
  'twitter',
  'tweet'
], function($, angular, Isotope, twitter) {

  var gui = require('nw.gui');

  return angular.module('timeline', ['tweet'])
    .controller('TimelineController', [
      '$scope',
      '$rootScope',
      function($scope, $rootScope) {

        $scope.tweets = [];

        // function isotopify() {
        //   setTimeout(function() {
        //     var isotope = new Isotope($element[0], {
        //       itemSelector: 'tweet',
        //       layoutMode: 'fitRows'
        //     });
        //   }, 1000);
        // }

        // function addTweet(data) {
        //   console.log(data);

        //   // bomb out if this is the initial friends data
        //   if (data.friends) {
        //     return;
        //   }

        //   if (data.text) {
        //     $scope.tweets.unshift(data);
        //     $scope.$apply();
        //   }
        // }

        // function handleStreamError(err) {
        //   throw err;
        // }

        // function startStream() {
        //   twitter.startStream(addTweet, handleStreamError);
        // }

        // function getTweets(callback) {
        //   twitter.getTimeline(function(error, data, response) {
        //     if (!error) {
        //       $scope.tweets = data;
        //       $scope.$apply();

        //       console.log(data);
        //       callback();
        //     }
        //   });
        // }

        // (function _init() {
        //   getTweets(startStream);
        // })();

        function addTweet(data) {
          // console.log(data);

          // bomb out if this is the initial friends data
          if (data.friends) {
            return;
          }

          if (data.text) {
            $scope.tweets.unshift(data);
            $scope.$apply();
          }
        }

        function handleStreamError(err) {
          throw err;
        }

        function startStream() {
          twitter.startStream(addTweet, handleStreamError);
        }

        function getTweets(callback) {
          twitter.getTimeline(undefined, function(tweets, err) {
            if (err) {
              // console.log(err);
              // console.log('USING BACKUP TWEETS');
              $scope.tweets = JSON.parse(localStorage.getItem('backupTweets'));
            } else {
              $scope.tweets = tweets;
            }

            $scope.$apply();

            callback($scope.tweets);
            // console.log($scope.tweets);
          });
        }

        function startTimeline(stream, callback) {
          getTweets(callback);

          if (!stream) {
            setTimeout(function() {
              getTweets(callback);
            }, 30000);
          }
        }

        $scope.sorter = function(tweet) {
          if ($scope.sortBy === 'time') {
            return -tweet.id;
          } else {
            return -tweet.handicappedScore;
          }
        };

        (function _init() {
          startTimeline(true, startStream);
        })();

      }
    ])
    .directive('timeline', function() {
      return {
        restrict: 'E',
        controller: 'TimelineController',
        templateUrl: 'templates/timeline.html',
        scope: {
          sortBy: '=',
          scored: '=',
          query: '='
        },
        link: function(scope, element, attrs) {
          function handleLink(e) {
            e.preventDefault();
            var browser = gui.Window.open('browser.html', {
              width: 1000,
              height: 700,
              transparent: true,
              toolbar: false,
              frame: false,
              focus: true
            });

            browser.on('document-start', function(frame) {
              browser.window.browserSrc = e.currentTarget.href;
            });
          }

          element.on('click', 'a', handleLink);
        }
      };
    });

});
