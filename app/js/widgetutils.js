(function() {
  'use strict';
  var WidgetUtilsClass, WidgetUtilsModule;

  WidgetUtilsModule = angular.module('WidgetUtilsModule', []);

  WidgetUtilsClass = (function() {

    function WidgetUtilsClass($parse) {
      this.$parse = $parse;
    }

    WidgetUtilsClass.prototype.getOptions = function(el, defaults, attrName) {
      var options, opts;
      if (defaults == null) defaults = {};
      if (attrName == null) attrName = 'ui:options';
      opts = $(el).attr(attrName);
      if (opts != null) {
        options = angular.fromJson('[' + opts + ']')[0];
        return angular.extend(defaults, options);
      } else {
        return defaults;
      }
    };

    WidgetUtilsClass.prototype.parseAttrExpr = function(el, attrName) {
      var attr;
      if (attrName != null) {
        attr = $(el).attr(attrName);
        return this.$parse(attr);
      }
    };

    WidgetUtilsClass.prototype.setValue = function(scope, attrExpr, value) {
      var parsedValue;
      if ((attrExpr != null ? attrExpr.expression : void 0) != null) {
        parsedValue = this.parseValue(value, attrExpr, scope);
        console.log('set value', attrExpr.expression, scope, parsedValue);
        return this.$parse(attrExpr.expression).assign(scope, parsedValue);
      }
    };

    WidgetUtilsClass.prototype.formatValue = function(value, attrExpr, scope) {
      var fm, _i, _len, _ref;
      if ((attrExpr != null ? attrExpr.formatters : void 0) != null) {
        _ref = attrExpr.formatters;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          fm = _ref[_i];
          if ((fm != null ? fm.format : void 0) != null) {
            value = fm.format.apply(scope, [value].concat(fm.arguments));
          }
        }
      }
      return value;
    };

    WidgetUtilsClass.prototype.parseExpr = function(val) {
      var args, expr, frmt, name, part, pts, _i, _len;
      if (!(val != null) || val === '') return null;
      expr = {
        formatters: []
      };
      pts = val.split('|');
      expr.expression = pts.shift();
      for (_i = 0, _len = pts.length; _i < _len; _i++) {
        part = pts[_i];
        args = part.split(':');
        name = args.shift();
        frmt = angular.formatter[name];
        if (frmt != null) {
          expr.formatters.push({
            name: name,
            parse: frmt.parse,
            format: frmt.format,
            arguments: args
          });
        }
      }
      return expr;
    };

    return WidgetUtilsClass;

  })();

  WidgetUtilsModule.factory("widgetUtils", [
    '$parse', function($parse) {
      return new WidgetUtilsClass($parse);
    }
  ]);

}).call(this);
