'use strict'

WidgetUtilsModule = angular.module('WidgetUtilsModule',[])

class WidgetUtilsClass
  constructor: (@$parse)->
  getOptions: (el, defaults, attrName)->
    defaults ?= {}
    attrName ?= 'ui:options'
    opts = $(el).attr(attrName)
    if opts?
      options = angular.fromJson('['+opts+']')[0]
      angular.extend(defaults, options)
    else
      defaults

  parseAttrExpr: (el, attrName)->
    if attrName?
      attr = $(el).attr(attrName)
      @$parse(attr)
  
  setValue: (scope, attrExpr, value)->
    if attrExpr?.expression?
      parsedValue = this.parseValue(value, attrExpr, scope)
      console.log('set value',attrExpr.expression,scope,parsedValue)
      @$parse(attrExpr.expression).assign(scope, parsedValue)

  
  formatValue: (value, attrExpr, scope)->
    if attrExpr?.formatters?
      for fm in attrExpr.formatters
        if fm?.format?
          value = fm.format.apply(scope, [value].concat(fm.arguments))
    value
  
  parseExpr: (val)->
    if not val? or val==''
      return null
    expr = formatters:[]
    pts = val.split('|')
    expr.expression = pts.shift()
    for part in pts
      args = part.split(':')
      name = args.shift()
      frmt = angular.formatter[name]
      if frmt?
        expr.formatters.push
            name: name, 
            parse: frmt.parse, 
            format: frmt.format, 
            arguments: args
    return expr

WidgetUtilsModule.factory("widgetUtils", ['$parse', ($parse)-> new WidgetUtilsClass($parse)])