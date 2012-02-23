'use strict'
### http://docs.angularjs.org/#!angular.service ###

# Demonstrate how to register services
# In this case it is a simple constant service.
servicesApp = angular.module('myApp.services', [])
servicesApp.factory('Survey', ['$resource', ($resource)->
  $resource('data/survey1.json')
]
)