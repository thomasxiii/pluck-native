'use strict';

define([
  'jquery',
  'angular',
  'twitter',
  'stoplights'
], function($, angular, twitter) {

  return angular.module('controls', ['stoplights'])
    .controller('ControlsController', [
      '$scope',
      '$rootScope',
      '$compile',
      '$element',
      function($scope, $rootScope, $compile, $element) {

        $scope.sortBy = 'time';
        $scope.scored = true;

        $scope.setSort = function(mode) {
          $scope.sortBy = mode;
        };

        function getProfile() {
          twitter.getProfile(function(err, data, response) {
            // console.log(err, data);
            if (err) {
              throw err;
            }

            $scope.avatar = data.profile_image_url.replace('_normal', '');
          });
        }

        (function _init() {
          getProfile();
        })();

      }
    ])
    .directive('controls', function() {
      return {
        restrict: 'E',
        controller: 'ControlsController',
        templateUrl: 'templates/controls.html',
        scope: {
          sortBy: '=',
          scored: '=',
          query: '='
        },
        link: function(scope, element, attrs) {

        }
      };
    });

});
