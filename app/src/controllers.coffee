'use strict'
namespace('Questionnaire')

class @Questionnaire.ApplicationController
  @$inject: ['$rootScope', '$location', '$log', 'QuestionnaireService']
  constructor: (@$rootScope, @$location, @$log, @QuestionnaireService)->
    @$rootScope.$watch((()=>@$location.path()), @onPathChanged)    
    @$rootScope.$watch('questionnaireId', @onQuestionnaireChanged)

  # This is the core state of the application; here we decide which page we should be viewing
  onPathChanged: ()=>
    urlParts = @$location.path().split('/')
    @$rootScope.questionnaireId = urlParts?[1] ? ''
    @$rootScope.questionIndex = Number(urlParts?[2])
    if @$rootScope.questionnaireId isnt '' and @$rootScope.questionIndex > 0
      @$rootScope.pageTemplate = '/templates/question.html'
    else if @$rootScope.questionnaireId isnt ''
      @$rootScope.pageTemplate = '/templates/questionnaire-detail.html'
    else
      @$rootScope.pageTemplate = '/templates/questionnaire-list.html'

  onQuestionnaireChanged: ()=>
    if @$rootScope.questionnaireId isnt ''
      # The questionnaire we are working on has changed so download it and create a new response
      @QuestionnaireService.get(@$rootScope.questionnaireId).success (questionnaire)=>
        @$rootScope.questionnaire = questionnaire
        now = new Date()
        @$rootScope.response =
          questionnaire: questionnaire._id
          date: now.toDateString()
          time: now.getTime()
          type: 'response'
          answers: questionnaire.questions.map (question, index)->
            question: question      # the question being answered
            questionIndex: index+1  # questionIndex is 1-based
            isValid: false          # initially all answers are invalid

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
    @QuestionnaireService.get(@$scope.questionnaireId).success (questionnaire)=>
      questions = questionnaire.questions
      index = @$scope.questionIndex-1 # questionIndex is 1-based
      question = questions[index]
      @$scope.question = question
      @$scope.answer = @$scope.response.answers[index]
      @$scope.questionTemplate = "/templates/questions/#{question.type}.html"
      @$scope.next = ()=> if index < questions.length-1 then @$location.path("/#{@$scope.questionnaireId}/#{index+2}")
      @$scope.back = ()=> @$location.path("/#{@$scope.questionnaireId}/#{index}")

  isValid: ()=>
    @$scope.answer?.isValid

class @Questionnaire.IdentityQuestionController
  @$inject: ['$scope']
  constructor: (@$scope)->

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