'use strict'
### http://docs.angularjs.org/#!angular.service ###

servicesApp = angular.module('myApp.services', [])
servicesApp.factory('Survey', ['$resource', ($resource)->
  $resource("data/:survey.json")
]
)