'use strict'
# A service that provides access to the questionnaire data
class QuestionnaireService
  @$inject: ['$http', '$rootScope', '$q', '$log']
  constructor: (@$http, @$rootScope, @$q, @$log)->
    @$log.log "QuestionnaireService: Initializing"
    @questionnaireListPromise = null
    @currentQuestionnairePromise = null
    @questionnairePromises = []

    @$rootScope.$watch 'questionnaireId', (id)=>
      id ?= '' # Normalize the id
      @updateCurrentQuestionnaire(id)

    @$rootScope.$watch 'questionIndex', (value)=>
      #updateCurrentQuestion(value)

  list: ()->
    @$log.log "QuestionnaireService: List Requested"
    unless @questionnaireListPromise?    
      @$log.log "QuestionnaireService: Loading List"
      @questionnaireListPromise = @$http
        .get('data/questionnaires.json')
        .success (questionnaires)=>
          @$log.log "QuestionnaireService: List Loaded"
          questionnaires
    @questionnaireListPromise

  get: (id)->
    # Set up the deferred promise
    if id is ''
      @$log.log "QuestionnaireService: Questionnaire '#{id}' is Invalid"
      q = @$q.defer()
      q.reject('Invalid questionnaire id')
      # Return the rejected promise
      q.promise
    else
      @$log.log "QuestionnaireService: Questionnaire '#{id}' Requested"
      unless @questionnairePromises[id]?
        @$log.log "QuestionnaireService: Questionnaire '#{id}' Loading"
        # Cache this promise against the questionnaire id      
        @questionnairePromises[id] = @$http.get("data/questionnaires/#{id}.json").success (questionnaire)=>
          @$log.log "QuestionnaireService: Questionnaire '#{id}' Loaded"

      # Update the current questionnaire promise
      @questionnairePromises[id]

  updateCurrentQuestionnaire: (id)=>
    @currentQuestionnairePromise = @get(id)
      .then((response)=>
          questionnaire = response.data
          @$rootScope.questionnaire = questionnaire
          @$rootScope.response = @newResponse(questionnaire)
      , ()=>
        # Either the original promise or the get have failed
        @clearQuestionnaire()
      )

  clearQuestionnaire: ()=>
      @$rootScope.questionnaire = null
      @$rootScope.response = null

  newResponse: (questionnaire)=>
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

createFactory = (Cls) ->
  ['$injector', ($injector) -> $injector.instantiate(Cls)]

angular.module('QuestionnaireModule', [])
  .factory("QuestionnaireService", createFactory(QuestionnaireService))


