'use strict';

requirejs.config({
  paths: {
    jquery: 'lib/jquery.min',
    angular: 'lib/angular.min',
    isotope: 'lib/isotope.pkgd.min'
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
  'twitter',
  'timeline',
  'controls',
  'stoplights'
], function($, angular, twitter, timeline) {

  var gui = require('nw.gui');
  gui.Window.get().showDevTools();

  angular.module('app', [
    'timeline',
    'controls',
    'stoplights'
  ]);

  angular.bootstrap(document, ['app']);

});
