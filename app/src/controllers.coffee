'use strict'
namespace('Questionnaire')

# Private base class for Controllers
class Controller
  constructor: (@$scope) ->

  # Use this to wire up a helper function from the controller to the scope
  # So rather than having to do @$scope.someFn = @someFn
  # You can just write @addHelper('someFn')
  addHelper: (name)->
    @$scope[name] = @[name]

# Controls the display of individual pages based on the current page in the PageManager
class @Questionnaire.PageController extends Controller
  @$inject: ['$scope','PageManager']
  constructor: ($scope, @PageManager)->
    super($scope)
    # Wire up the helper methods to the scope
    @addHelper('isCurrent')
    @addHelper('pageCSSClass')

  isCurrent: ()=>
    @$scope.page.name == @$scope.currentPageName

  pageCSSClass: ()=>
    'current' if @isCurrent()

# Controls the display of the list of questionnaires
class @Questionnaire.QuestionnaireListController extends @Questionnaire.PageController
  @$inject: ['$scope','PageManager', 'QuestionnaireService']
  constructor: ($scope, PageManager, QuestionnaireService)->
    super($scope, PageManager)
    QuestionnaireService.list().success (response)=>
      angular.extend($scope, response) # Merge response into scope

# Controls the display of questions in a questionnaire
class @Questionnaire.QuestionController extends @Questionnaire.PageController
  @$inject: ['$scope', 'PageManager']
  constructor: ($scope, PageManager)->
    super($scope, PageManager)
    @addHelper('choiceCSSClass')
  choiceCSSClass: (page, choice)=>
    if page.response is choice 
      'blue'
    else
      'white'
