'use strict'
namespace('Questionnaire')

class @Questionnaire.ApplicationController
  @$inject: ['$rootScope']
  constructor: (@$scope)->
    @$scope.$on '$afterRouteChange', (scope,current,previous)=>
      @$scope.questionnaireId = current.params.questionnaire
      @$scope.questionIndex = current.params.question

# Controls the display of the list of questionnaires
class @Questionnaire.QuestionnaireListController
  @$inject: ['$scope', 'QuestionnaireService']
  constructor: (@$scope, @QuestionnaireService)->
    @$scope.showPage = @showPage
    @QuestionnaireService.list().success (response)=>
      angular.extend(@$scope, response) # Merge response into scope

  showPage: ()=>
    # Only show this page if there is no questionnaire selected
    @$scope.questionnaireId == ''

class @Questionnaire.QuestionnaireController
  @$inject: ['$scope','QuestionnaireService']
  constructor: (@$scope, @QuestionnaireService)->
    @$scope.showPage = @showPage
    @$scope.$watch 'questionnaireId', ()=>
      QuestionnaireService.get(@questionnaireId).success (questionnaire)=>
        angular.extend(@$scope, questionnaire) # Merge response into scope
  showPage: ()=>
    @$scope.questionnaireId != '' and not angular.isNumber(@$scope.questionIndex)

# Controls the display of questions in a questionnaire
class @Questionnaire.QuestionController
  @$inject: ['$scope']
  constructor: (@$scope)->
  choiceCSSClass: (page, choice)=>
    if page.response is choice 
      'blue'
    else
      'white'
