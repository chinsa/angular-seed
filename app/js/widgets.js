(function() {
  'use strict';
  var Widgets;

  Widgets = angular.module('Widgets', []);

  Widgets.directive('uiMasked', [
    '$parse', function($parse) {
      return {
        replace: true,
        template: "<input type='text'></input>",
        link: function($scope, el, attrs) {
          var isValidExp, maskExp, onChange, valueExp;
          valueExp = $parse(attrs.uiValue);
          isValidExp = $parse(attrs.uiIsvalid);
          maskExp = $parse(attrs.uiMask);
          onChange = function() {
            var valid;
            valid = el.isMaskValid();
            if (valid) {
              el.addClass('mask-valid').removeClass('mask-invalid');
            } else {
              el.addClass('mask-invalid').removeClass('mask-valid');
            }
            valueExp.assign($scope, el.mask());
            isValidExp.assign($scope, valid);
            return $scope.$digest();
          };
          $(el).mask(maskExp($scope));
          return el.keypress(onChange).keydown(onChange);
        }
      };
    }
  ]);

  Widgets.directive('uiDate', function() {
    return {
      replace: true,
      template: "<input type='text'></input>",
      link: function($scope, el, attrs) {
        return $(el).datepicker({
          changeMonth: true,
          changeYear: true
        });
      }
    };
  });

}).call(this);
