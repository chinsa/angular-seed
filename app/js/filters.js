(function() {
  'use strict';
  /* http://docs.angularjs.org/#!angular.filter
  */
  var filterModule;

  filterModule = angular.module('myApp.filters', []);

  filterModule.filter('interpolate', [
    'version', function(version) {
      return function(text) {
        return String(text).replace(/\%VERSION\%/mg, version);
      };
    }
  ]);

}).call(this);
