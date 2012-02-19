'use strict';
/* http://docs.angularjs.org/#!angular.service */

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.widgets']);
myApp.run(['$route', '$window', '$rootScope', function($route, $window, $rootScope) {

    $route.when('/page/:index', {template: 'partials/page.html', controller: PageController});
    $route.when('/view1', {template: 'partials/partial1.html', controller: MyCtrl1});
    $route.when('/view2', {template: 'partials/partial2.html', controller: MyCtrl2});
    $route.otherwise({redirectTo: '/view1'});

    var self = this;

    $rootScope.$on('$afterRouteChange', function(){
      $window.scrollTo(0,0);
    });
  }]);
