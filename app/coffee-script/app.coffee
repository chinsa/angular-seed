'use strict'
### http://docs.angularjs.org/#!angular.service ###

# Declare app level module which depends on filters, and services
myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.widgets'])
myApp.run [
  '$route', '$window', '$rootScope',
  ($route, $window, $rootScope)->
]