'use strict'

# App Controllers
class PageController
  @$inject: ['$routeParams', '$http', '$log']
  constructor: ($routeParams, $http)->
    @index = (Number) $routeParams.index
    $http.get('data/survey1.json').success (survey)->
      @survey = survey

  currentPage: ()->
    @survey.pages[this.index]


class EmptyController
