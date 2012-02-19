(function() {
  'use strict';
  /* http://docs.angularjs.org/#!angular.service
  */
  var myApp;

  myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.widgets']);

  myApp.run([
    '$route', '$window', '$rootScope', function($route, $window, $rootScope) {
      $route.when('/page/:index', {
        template: 'partials/page.html',
        controller: PageController
      });
      $route.when('/view1', {
        template: 'partials/partial1.html',
        controller: MyCtrl1
      });
      $route.when('/view2', {
        template: 'partials/partial2.html',
        controller: MyCtrl2
      });
      $route.otherwise({
        redirectTo: '/page/0'
      });
      return $rootScope.$on('$afterRouteChange', function() {
        return $window.scrollTo(0, 0);
      });
    }
  ]);

}).call(this);
