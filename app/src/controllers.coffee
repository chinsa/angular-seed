'use strict'
namespace('Questionnaire')

class @Questionnaire.ApplicationController
  @$inject: ['$rootScope', '$location', '$log', 'QuestionnaireService']
  constructor: (@$rootScope, @$location, @$log, @QuestionnaireService)->

# Controls the display of the list of questionnaires
class @Questionnaire.QuestionnaireListController
  @$inject: ['$scope', 'QuestionnaireService', '$log']
  constructor: (@$scope, @QuestionnaireService, @$log)->
    @QuestionnaireService.list().success (list)=>
      angular.extend(@$scope, list) # Merge list into scope
    
class @Questionnaire.QuestionnaireController
  @$inject: ['$scope', '$location', 'QuestionnaireService', '$log']
  constructor: (@$scope, @$location, @QuestionnaireService, @$log)->
    @$scope.home = @home
    @$scope.start = @start

  home: ()=>
    @$location.path('/')
  start: ()=>
    @$location.path("/#{@$scope.questionnaireId}/1")
# Controls the display of an individual question in a questionnaire
class @Questionnaire.QuestionController
  @$inject: ['$scope','QuestionnaireService','$location', '$log']
  constructor: (@$scope, @QuestionnaireService, @$location, @$log)->
    @$scope.isValid = @isValid
    $scope.$watch("questionIndex", @onQuestionChanged)
  
  onQuestionChanged: ()=>
    unless isNaN(@$scope.questionIndex)
      @QuestionnaireService.get(@$scope.questionnaireId)
      .success((questionnaire)=>
        questions = questionnaire.questions
        index = @$scope.questionIndex-1 # questionIndex is 1-based
        question = questions[index]
        @$scope.question = question
        @$scope.answer = @$scope.response.answers[index]
        @$scope.questionTemplate = "/templates/questions/#{question.type}.html"
        @$scope.next = ()=>
          if index < questions.length-1
            @$location.path("/#{@$scope.questionnaireId}/#{index+2}")
          else
            @$location.path("/#{@$scope.questionnaireId}/summary")
        @$scope.back = ()=> @$location.path("/#{@$scope.questionnaireId}/#{index}")
      )

  isValid: ()=>
    @$scope.answer?.isValid

class @Questionnaire.IdentityQuestionController
  @$inject: ['$scope']
  constructor: (@$scope)->
    @$scope.$watch 'answer.nhsIsValid && answer.dobIsValid', (value)=>
      @$scope.answer.isValid = value
      @$scope.answer.description = "#{@$scope.answer.nhs} : #{@$scope.answer.dob}"

# Controls the behaviour of a multichoice question
class @Questionnaire.ChoiceQuestionController
  @$inject: ['$scope']
  constructor: (@$scope)->
    @$scope.choiceCSSClass = @choiceCSSClass
    @$scope.selectChoice = @selectChoice

  choiceCSSClass: (choice)=>
    if @$scope.answer?.choice is choice 
      'blue'
    else
      'white'

  selectChoice: (choice)=>
    @$scope.answer.choice = choice
    @$scope.answer.isValid = choice?
    @$scope.answer.description = choice.title