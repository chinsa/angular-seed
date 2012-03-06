'use strict'

Services = angular.module('Services', [])

# A service that provides access to the questionnaire data
class QuestionnaireService
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

Services.factory("QuestionnaireService", ['$http', '$log', ($http, $log)-> new QuestionnaireService($http, $log)])

# Wires up routes to handler functions that are called when the browser navigates to the route
class RouteHandler
  constructor: (@$routeProvider, @$rootScope, @$log)->
    @$log.log "RouteHandler: Initializing"

    @$rootScope.$on('$afterRouteChange', (current, previous)=>

      if current?.template?
        # If there is a template associated with the route then update the $rootScope
        @$log.log "RouteHandler: updating page template for route: #{current.name} to #{current.template}"
        @$rootScope.pageTemplate = current.template

      if current?.handler?
        # If there is a handler on the route then run it
        @$log.log "RouteHandler: running handler for route: #{current.name}"
        current.handler(current, previous)

      unless current?.template? or current?.handler?
        @$log.log "RouteHandler: unhandled route: #{current?.name}"
    )

  # Create a route and designate a handler and a template 
  handle: (path, options={})=>
    @$log.log "RouteHandler: Create handler: #{path}"
    @$routeProvider.when(path, options)

  redirectTo: (path)=>
    @$location.path("#{path}")

Services.factory("RouteHandler", ['$routeProvider', '$rootScope', '$log', ($routeProvider, $rootScope, $log)-> new RouteHandler($routeProvider, $rootScope, $log)])

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