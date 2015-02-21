'use strict';

define([
  'jquery',
  'angular'
], function($, angular) {

  var gui = require('nw.gui');
  var nativeWindow = gui.Window.get();

  return angular.module('stoplights', [])

    .directive('stoplights', function() {
      return {
        restrict: 'E',
        templateUrl: 'templates/stoplights.html',
        scope: {
          buttons: '@'
        },
        link: function(scope, element, attrs) {
          var toShow = scope.buttons || '111';

          scope.hasClose = toShow[0] === '1';
          scope.hasMin = toShow[1] === '1';
          scope.hasMax = toShow[2] === '1';
        },
        controller: function($scope) {

          /**
           * close the window
           */
          $scope.close = function() {
            nativeWindow.close();
          };

          /**
           * minimize the window
           */
          $scope.minimize = function() {
            nativeWindow.minimize();
          };

          /**
           * maximize the window
           */
          $scope.maximize = function() {
            nativeWindow.maximize();
          };

        }
      };
    });

});
