(function() {
  'use strict';
  /* http://docs.angularjs.org/#!angular.service
  */
  var myApp;

  myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.widgets']);

  myApp.run(['$route', '$window', '$rootScope', function($route, $window, $rootScope) {}]);

}).call(this);
