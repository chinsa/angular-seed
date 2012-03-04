'use strict'

# ui:masked
# a directive for a text element to obtain masked-field editing capabilities
Widgets = angular.module('Widgets', [])
Widgets.directive 'uiMasked', ['widgetUtils',(widgetUtils)->
  compile: (compileElement)->
    defaults = {allowInvalid: false}
    valExpr = widgetUtils.parseAttrExpr(compileElement, 'ui:value')
    maskExpr = widgetUtils.parseAttrExpr(compileElement, 'ui:mask')
    isvalidExpr = widgetUtils.parseAttrExpr(compileElement, 'ui:isvalid')
    options = widgetUtils.getOptions(compileElement, defaults)
    
    ($scope, linkingElement)->
      inputElement = $('<input type="text"/>')
      $(linkingElement).append(inputElement)
      $(inputElement).mask(maskExpr())

      handleEvent = ()->
        um = inputElement.mask()
        valid = inputElement.isMaskValid()
        if not options.allowInvalid and not valid
          um=''
        if valid
          inputElement.addClass('mask-valid').removeClass('mask-invalid')
        else
          inputElement.addClass('mask-invalid').removeClass('mask-valid')
        if isvalidExpr?
          isvalidExpr.assign(valid)
        valExpr.assign(um)

      inputElement.keypress(handleEvent).keydown(handleEvent)

      $scope.$watch valExpr.expression, (val)->
        d = widgetUtils.formatValue(val, valExpr, $scope)
        old = inputElement.mask()
        if old isnt d
          inputElement.val(d).trigger('blur.mask')
]