(function() {
  'use strict';
  /* http://docs.angularjs.org/#!angular.service
  */
  var servicesApp;

  servicesApp = angular.module('myApp.services', []);

  servicesApp.factory('Survey', [
    '$resource', function($resource) {
      return $resource('data/survey1.json');
    }
  ]);

}).call(this);
