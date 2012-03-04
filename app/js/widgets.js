(function() {
  'use strict';
  var Widgets;

  Widgets = angular.module('Widgets', []);

  Widgets.directive('uiMasked', [
    'widgetUtils', function(widgetUtils) {
      return {
        compile: function(compileElement) {
          var defaults, isvalidExpr, maskExpr, options, valExpr;
          defaults = {
            allowInvalid: false
          };
          valExpr = widgetUtils.parseAttrExpr(compileElement, 'ui:value');
          maskExpr = widgetUtils.parseAttrExpr(compileElement, 'ui:mask');
          isvalidExpr = widgetUtils.parseAttrExpr(compileElement, 'ui:isvalid');
          options = widgetUtils.getOptions(compileElement, defaults);
          return function($scope, linkingElement) {
            var handleEvent, inputElement;
            inputElement = $('<input type="text"/>');
            $(linkingElement).append(inputElement);
            $(inputElement).mask(maskExpr());
            handleEvent = function() {
              var um, valid;
              um = inputElement.mask();
              valid = inputElement.isMaskValid();
              if (!options.allowInvalid && !valid) um = '';
              if (valid) {
                inputElement.addClass('mask-valid').removeClass('mask-invalid');
              } else {
                inputElement.addClass('mask-invalid').removeClass('mask-valid');
              }
              if (isvalidExpr != null) isvalidExpr.assign(valid);
              return valExpr.assign(um);
            };
            inputElement.keypress(handleEvent).keydown(handleEvent);
            return $scope.$watch(valExpr.expression, function(val) {
              var d, old;
              d = widgetUtils.formatValue(val, valExpr, $scope);
              old = inputElement.mask();
              if (old !== d) return inputElement.val(d).trigger('blur.mask');
            });
          };
        }
      };
    }
  ]);

}).call(this);
