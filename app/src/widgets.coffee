'use strict'

# ui:masked
# a directive for a text element to obtain masked-field editing capabilities
Widgets = angular.module('Widgets', [])

Widgets.directive 'uiMasked', ['$parse',($parse)->
  replace: true
  template: "<input type='text'></input>"
  link: ($scope, el, attrs)->
    valueExp = $parse(attrs.uiValue)
    isValidExp = $parse(attrs.uiIsvalid)
    maskExp = $parse(attrs.uiMask)
    onChange = ()->
      valid = el.isMaskValid()
      if valid
          el.addClass('mask-valid').removeClass('mask-invalid')
      else
          el.addClass('mask-invalid').removeClass('mask-valid')
      valueExp.assign($scope, el.mask())
      isValidExp.assign($scope, valid)
      $scope.$digest()

    $(el).mask(maskExp($scope))
    el.keypress(onChange).keydown(onChange)
]

Widgets.directive 'uiDate', ()->
  replace: true
  template: "<input type='text'></input>"
  link: ($scope, el, attrs)->
    $(el).datepicker
      changeMonth: true
      changeYear: true
