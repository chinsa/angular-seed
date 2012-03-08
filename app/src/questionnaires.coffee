'use strict'
# A service that provides access to the questionnaire data
class QuestionnaireService
  @$inject: ['$http', '$log']
  constructor: (@$http, @$log)->
    @$log.log "QuestionnaireService: Initializing"
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

createFactory = (Cls) ->
  ['$injector', ($injector) -> $injector.instantiate(Cls)]

angular.module('QuestionnaireModule', [])
  .factory("QuestionnaireService", createFactory(QuestionnaireService))


