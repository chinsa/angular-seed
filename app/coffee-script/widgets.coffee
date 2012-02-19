'use strict'
### http://docs.angularjs.org/#!angular.widget ###

widgetsModule = angular.module('myApp.widgets', [], ()->
  # temporary hack until we have proper directive injection.
  angular.directive('app-version', ()->
    ['version', '$element', (version, element)->
      element.text(version)
    ]
  )
)
