'use strict'
### http://docs.angularjs.org/#!angular.service ###

# Declare app level module which depends on filters, and services
myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.widgets'])
myApp.run [
  '$route', '$window', '$rootScope',
  ($route, $window, $rootScope)->
    $route.when('/page/:index', {template: 'partials/page.html', controller: PageController})
    $route.when('/view1', {template: 'partials/partial1.html', controller: EmptyController})
    $route.when('/view2', {template: 'partials/partial2.html', controller: EmptyController})
    $route.otherwise({redirectTo: '/page/0'})

    $rootScope.$on '$afterRouteChange', ()->
      $window.scrollTo(0,0)
]