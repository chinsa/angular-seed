'use strict'
### http://docs.angularjs.org/#!angular.service ###

Services = angular.module('Services', [])

# A service that provides access to the questionnaire data
class QuestionnaireService
  constructor: (@$http, @$rootScope, $routeParams, @$log)->
    @$log.log "QuestionnaireService: Initializing QuestionnaireService"
    @questionnairePromises = []
    @questionnaireListPromise = null
    
  list: ()->
    @$log.log "QuestionnaireService: List Requested"
    unless @questionnaireListPromise?    
      @$log.log "QuestionnaireService: Loading List"
      @questionnaireListPromise = @$http
        .get('data/questionnaires.json')
        .success (questionnaires)=>
          @$log.log "QuestionnaireService: List Loaded"
          questionnaires
    @questionnaireListPromise.success (questionnaire)=>
      #@deleteQuestionPages()
      #@createQuestionsPages(@currentQuestionnaire)

  get: (name)->
    @$log.log "QuestionnaireService: Questionnaire '#{name}' Requested"
    unless @questionnairePromises[name]?
      @$log.log "QuestionnaireService: Questionnaire '#{name}' Loading"
      @questionnairePromises[name] = @$http
        .get("data/questionnaires/#{name}.json")
        .success (questionnaire)=>
          @$log.log "QuestionnaireService: Questionnaire '#{name}' Loaded"
          questionnaire
    @questionnairePromises[name]

Services.factory("QuestionnaireService", ['$http', '$rootScope','$routeParams','$log', ($http, $rootScope, $routeParams, $log)-> new QuestionnaireService($http, $rootScope, $routeParams, $log)])

# A services that manages the responses
class ResponseManager
  constructor: (@QuestionnaireService, @$log)->
    return this

  newResponse: ()->
    date = new Date()
    @qs.currentQuestionnaire.success (questionnaire)=>
      @currentResponse =
        questionnaire: questionnaire
        submission:
          date: date.toDateString()
          time: date.getTime()
        hash: null
        responses: (question: question, choice: null for question in questionnaire.questions)

Services.factory("ResponseManager", ['QuestionnaireService', '$log', (QS, $log)-> new ResponseManager(QS, $log)])