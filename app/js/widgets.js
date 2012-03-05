(function() {
  'use strict';
  var Widgets;

  Widgets = angular.module('Widgets', []);

  Widgets.directive('uiMasked', [
    'widgetUtils', function(widgetUtils) {
      return {
        compile: function(compileElement) {
          var attr, attributes, defaults, isvalidExpr, key, maskExpr, options, valExpr, _i, _len, _ref;
          defaults = {
            allowInvalid: false
          };
          valExpr = widgetUtils.parseAttrExpr(compileElement, 'ui:value');
          maskExpr = widgetUtils.parseAttrExpr(compileElement, 'ui:mask');
          isvalidExpr = widgetUtils.parseAttrExpr(compileElement, 'ui:isvalid');
          attributes = {};
          _ref = compileElement[0].attributes;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            attr = _ref[_i];
            if (attr.name.slice(0, 3) !== 'ui:') {
              attributes[attr.name] = attr.value;
            }
          }
          for (key in attributes) {
            attr = attributes[key];
            compileElement.removeAttr(key);
          }
          options = widgetUtils.getOptions(compileElement, defaults);
          return function($scope, linkingElement) {
            var handleEvent, inputElement;
            inputElement = $("<input type='text' />");
            inputElement.attr(attributes);
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
