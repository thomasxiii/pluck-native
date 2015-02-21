'use strict';

requirejs.config({
  paths: {
    jquery: 'lib/jquery.min',
    angular: 'lib/angular.min',
    domReady: 'lib/domReady'
  },
  shim: {
    angular: {
      exports: 'angular'
    }
  }
});

define([
  'jquery',
  'angular',
  'domReady',
  'stoplights',
  'viewport'
], function($, angular, domReady, twitter) {

  domReady(function() {
    angular.module('browser', [
      'stoplights',
      'viewport'
    ]).controller('BrowserController', ['$scope', function($scope) {
      $scope.src = window.browserSrc;
    }]);

    angular.bootstrap(document, ['browser']);
  });

});
