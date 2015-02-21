'use strict';

define([
  'jquery',
  'angular'
], function($, angular) {

  return angular.module('viewport', [])

    .directive('viewport', function() {
      return {
        restrict: 'E',
        templateUrl: 'templates/viewport.html',
        scope: {
          src: '='
        },
        controller: function($scope, $sce, $element) {
          $sce.trustAsResourceUrl($scope.src);
          $sce.trustAsUrl($scope.src);

          $element.find('iframe').attr('src', $scope.src);
        }
      };
    });

});
