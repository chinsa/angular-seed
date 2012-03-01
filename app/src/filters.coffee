'use strict'
### http://docs.angularjs.org/#!angular.filter ###

filterModule = angular.module('myApp.filters', [])
filterModule.filter 'interpolate', [
  'version',
  (version)->
    (text)->
      String(text).replace(/\%VERSION\%/mg, version)
]
